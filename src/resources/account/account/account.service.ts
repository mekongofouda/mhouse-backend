import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InviteUserDto } from '../dto/invite-user.dto';
import { UpdateUserAccountDto } from '../dto/update-user-account.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountEntity } from '../entities/account.entity';
import { ListUserAccountDto } from '../dto/list-user-account.dto';
import { Role } from '../../role/role/entities/role.entity';
import { FunctionPrivilegeEnum } from 'src/enums/function.privilege.enum';
import { Utils } from 'src/generics/utils';
import { NotificationService } from 'src/resources/notification/notification.service';
import { RegisterDto } from '../auth/dto/register.dto';
import * as bcrypt from 'bcrypt';
import { UserRoleEnum } from 'src/enums/role.enum';

@Injectable()
export class AccountService extends Utils {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,

    @InjectRepository(AccountEntity)
    private readonly accountRepository: Repository<AccountEntity>,
    private readonly notificationService: NotificationService,
  ) {
    super();
  }

    /** Service to register an account */
    async register(registerDto: RegisterDto, adminType?:string): Promise<AccountEntity> {
      
      //Get role to add at the account
      let superAdminRole = null;
      let customerRole = null;
      if(adminType == UserRoleEnum.SUPER_ADMIN){

        //Create role
        superAdminRole = await this.roleRepository.create({
          slug: UserRoleEnum.SUPER_ADMIN
        });

        customerRole = await this.roleRepository.create({
          slug: UserRoleEnum.CUSTOMER
        });


        //Hydrate role
        superAdminRole.title = 'Super administrateur';
        superAdminRole.description = 'Rôle du super administrateur de la plateforme';
        const date = new Date();
        const randNumber = Math.floor(Math.random() * 100);
        superAdminRole.refRole =
          'RROL' +
          randNumber.toString() +
          date.getFullYear() +
          date.getMonth() +
          date.getDay() +
          date.getMonth() +
          date.getMinutes() +
          date.getSeconds();
  
        //Hydrate role
        customerRole.title = 'Customer';
        customerRole.description = 'Rôle du customer de la plateforme';
        const date2 = new Date();
        const randNumber2 = Math.floor(Math.random() * 100);
        customerRole.refRole =
          'RROL' +
          randNumber2.toString() +
          date2.getFullYear() +
          date2.getMonth() +
          date2.getDay() +
          date2.getMonth() +
          date2.getMinutes() +
          date2.getSeconds();

        //Save customer rôle
        try {
          await this.roleRepository.save(customerRole);
        } catch (error) {
          throw new ConflictException(error.driverError.detail);
        }
    
        //Save super admin rôle
        try {
          await this.roleRepository.save(superAdminRole);
        } catch (error) {
          throw new ConflictException(error.driverError.detail);
        }

      } else {
        customerRole = await this.roleRepository.findOneBy({ slug: 'CUSTOMER' });
        if (!customerRole) {
          throw new HttpException(
            "Role not found, Your administrator has to create customer's role before you register",
            HttpStatus.NOT_FOUND,
          );
        }  
      }

      //Create the account object whit dto to save it
      const account = await this.accountRepository.create({
        ...registerDto,
      });
  
      //Crypt personnal datas
      account.salt = await bcrypt.genSalt();
      account.password = await bcrypt.hash(account.password, account.salt);
  
      //Add the account's role
       if (adminType == UserRoleEnum.SUPER_ADMIN) {
         account.role = superAdminRole;
      } else {
         account.role = customerRole;
      }
  
      //Persist account
      try {
        await this.accountRepository.save(account);
      } catch (error) {
        throw new ConflictException(error.driverError.detail);
      }

      return account;
    }
  
    async uploadAvatar(account, file) {
      const userAccount = await this.accountRepository.findOneBy({
        refAccount: account.refAccount,
      });
      if (userAccount != null) {
        if (
          this.IsAuthorised(userAccount, FunctionPrivilegeEnum.UPLOAD_AVATAR) !=
          false
        ) {
          throw new UnauthorizedException("Vous n'avez pas les privilèges requis");
        }
      }
      userAccount.avatar = file;
      console.log(userAccount);
  
      //Persist account
      try {
        await this.accountRepository.save(userAccount);
      } catch (error) {
        throw new ConflictException(error.driverError.detail); 
      }
  
      return userAccount;
    }
    
  async invite(inviteUserDto: InviteUserDto, account: AccountEntity) {

    const userAccount = await this.accountRepository.findOneBy({
      refAccount: account.refAccount,
    });

    if (userAccount != null) {
      if (
        this.IsAuthorised(userAccount, FunctionPrivilegeEnum.INVITE) == false
      ) {
        throw new UnauthorizedException();
      }
    }

    await this.notificationService.sendNotification(account);
    return userAccount;

  }

  async listUserAccount(listUserAccountDto: ListUserAccountDto) {
    let listUserAccount: AccountEntity[] = [];
    const accounts: AccountEntity[] = [];

    if (listUserAccountDto.refRole != undefined) {
      const role = await this.roleRepository.findOneBy({
        refRole: listUserAccountDto.refRole,
      });
      if (role) {
        listUserAccount = role.accounts;
      } else {
        throw new HttpException('Role not found', HttpStatus.NOT_FOUND);
      }
    } else {
      listUserAccount = await this.accountRepository.find();
    }

    listUserAccount.filter((account) => {
      if (listUserAccountDto.createdAt != undefined) {
        if (
          account.createdAt.toDateString() ==
          listUserAccountDto.createdAt.toDateString()
        ) {
          accounts.push(account);
        }
      }
      if (listUserAccountDto.updatedAt != undefined) {
        if (
          account.updatedAt.toDateString() ==
          listUserAccountDto.updatedAt.toDateString()
        ) {
          accounts.push(account);
        }
      }
    });

    if (
      accounts.length == 0 &&
      (listUserAccountDto.createdAt != undefined ||
        listUserAccountDto.updatedAt != undefined)
    ) {
      throw new HttpException('Account not found', HttpStatus.NOT_FOUND);
    } else if (accounts.length != 0) {
      listUserAccount = accounts;
    }

    return await listUserAccount;
  }

  async getHome(account: any) {
    const posts = account.posts;
    return await posts;
  }

  async showUserProfile(refAccount: string) {
    const account = await this.accountRepository.findOneBy({ refAccount });
    if (account == null) {
      throw new HttpException('Profile not found', HttpStatus.NOT_FOUND);
    }
    return account;
  }

  async updateUserAccount(
    refAccount: string,
    updateUserAccountDto: UpdateUserAccountDto,
  ) {
    const account = await this.accountRepository.findOne({
      where: { refAccount },
    });
    if (account == null) {
      throw new HttpException('Account not found', HttpStatus.NOT_FOUND);
    }
    Object.assign(account, updateUserAccountDto);

    try {
      await this.accountRepository.save(account);
    } catch (error) {
      throw new ConflictException(error.driverError.detail);
    }
    await this.notificationService.sendNotification(account);
    
    return account;
  }

  async deleteUserAccount(refAccount: string) {
    const account = await this.accountRepository.findOneBy({ refAccount });
    if (account == null) {
      throw new HttpException('Account not found', HttpStatus.NOT_FOUND);
    }

    try {
      await this.accountRepository.softRemove(account);
    } catch (error) {
      throw new ConflictException(error.driverError.detail);
    }
    await this.notificationService.sendNotification(account);

    return account;
  }
}
