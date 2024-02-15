import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Privilege } from './entities/privilege.entity';
import { Repository } from 'typeorm';
import { ListPrivilegeDto } from './dto/list-privilege.dto';
import { AddPrivilegeDto } from './dto/add-privilege.dto';
import { UpdatePrivilegeDto } from 'src/resources/role/privilege/dto/update-privilege.dto';
import { Role } from 'src/resources/role/entities/role.entity';
import { AccountEntity } from '../../account/entities/account.entity';
import { FunctionPrivilegeEnum } from 'src/enums/function.privilege.enum';
import { Utils } from 'src/generics/utils';
import { UserRoleEnum } from 'src/enums/role.enum';
import { NotificationService } from 'src/resources/notification/notification.service';

@Injectable()
export class PrivilegeService extends Utils {
  constructor(
    @InjectRepository(AccountEntity)
    private readonly accountRepository: Repository<AccountEntity>,

    @InjectRepository(Privilege)
    private readonly privilegeRepository: Repository<Privilege>,

    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    private readonly notificationService: NotificationService,
  ) {
    super();
  }

  async addPrivilege(addPrivilegeDto: AddPrivilegeDto, account: AccountEntity) {
    console.log(account);

    //Get user account object
    const userAccount = await this.accountRepository.findOneBy({
      refAccount: account.refAccount,
    });

    //Autorisation
    if (!(
      this.IsAuthorised(userAccount, FunctionPrivilegeEnum.ADD_PRIVILEGE) ||
      userAccount.role.slug == UserRoleEnum.SUPER_ADMIN
      )) {
      throw new UnauthorizedException("You d'ont have the required role or privilege!!! ");
    }

    //Create a privilege to save with the Dto
    const privilege = await this.privilegeRepository.create({
      ...addPrivilegeDto,
    });

    //Find if the user role
    const role = userAccount.role;
    role.privileges.push(privilege);

    //Save role and privilege
    try {
      await this.privilegeRepository.save(privilege);
    } catch (error) {
      throw new ConflictException(error.driverError.detail);
    }

    try {
      await this.roleRepository.save(role);
    } catch (error) {
      throw new ConflictException(error.driverError.detail);
    } 
    // await this.notificationService.sendNotification(account);
    return await privilege; 
  }

  async showPrivilegeDetail(
    refPrivilege: string,
    account: AccountEntity,
  ): Promise<Privilege> {

    console.log(account);
    //Get user account object
    const userAccount = await this.accountRepository.findOneBy({
      refAccount: account.refAccount,
    });

    //Autorisation
    if (!(
      this.IsAuthorised(userAccount, FunctionPrivilegeEnum.SHOW_PRIVILEGE) ||
      userAccount.role.slug == UserRoleEnum.SUPER_ADMIN
      )) {
      throw new UnauthorizedException("You d'ont have the required role or privilege!!! ");
    }

    const privilege = await this.privilegeRepository.findOneBy({
      refPrivilege,
    });
    
    if (privilege == null) {
      throw new HttpException('Privilege not found', HttpStatus.NOT_FOUND);
    }
    return privilege;
  }

  async updatePrivilege(
    refPrivilege: string,
    updatePrivilegeDto: UpdatePrivilegeDto,
    account: AccountEntity,
  ): Promise<Privilege> {

    const userAccount = await this.accountRepository.findOneBy({
      refAccount: account.refAccount,
    });

    //Autorisation
    if (!(
      this.IsAuthorised(userAccount, FunctionPrivilegeEnum.UPDATE_PRIVILEGE) ||
      userAccount.role.slug == UserRoleEnum.SUPER_ADMIN
      )) {
      throw new UnauthorizedException("You d'ont have the required role or privilege!!! ");
    }

    const privilege = await this.privilegeRepository.findOneBy({
      refPrivilege,
    });
    if (privilege == null) {
      throw new HttpException('Privilege not found', HttpStatus.NOT_FOUND);
    }
    Object.assign(privilege, updatePrivilegeDto);

    try {
      await this.privilegeRepository.save(privilege);
    } catch (error) {
      throw new ConflictException(error.driverError.detail);
    }
    await this.notificationService.sendNotification(account);

    return privilege;
  }

  async listPrivilege(
    listPrivilegeDto: ListPrivilegeDto,
    account: any,
  ): Promise<Privilege[]> {

    //Get user account object
    const userAccount = await this.accountRepository.findOneBy({
      refAccount: account.refAccount,
    });

    //Autorisation
    if (!(
      this.IsAuthorised(userAccount, FunctionPrivilegeEnum.LIST_PRIVILEGE) ||
      userAccount.role.slug == UserRoleEnum.SUPER_ADMIN
      )) {
      throw new UnauthorizedException("You d'ont have the required role or privilege!!! ");
    }

    let listPrivileges: Privilege[];
    const privileges: Privilege[] = [];

    if (listPrivilegeDto.refAccount != undefined) {
      const userAccount = await this.accountRepository.findOneBy({
        refAccount: listPrivilegeDto.refAccount,
      });
      if (userAccount == null) {
        throw new HttpException('Account not found', HttpStatus.NOT_FOUND);
      }
      listPrivileges = userAccount.role.privileges;
    } else if (listPrivilegeDto.all == 1) {
      listPrivileges = await this.privilegeRepository.find();
    } else {
      listPrivileges = account.role.privileges;
    }

    if (listPrivilegeDto.refRole != undefined) {
      const role = await this.roleRepository.findOneBy({
        refRole: listPrivilegeDto.refRole,
      });
      if (role == null) {
        throw new HttpException('Role not found', HttpStatus.NOT_FOUND);
      }

      listPrivileges = role.privileges;
    }

    listPrivileges.filter((privilege) => {
      if (listPrivilegeDto.createdAt != undefined) {
        if (
          privilege.createdAt.toDateString() ==
          listPrivilegeDto.createdAt.toDateString()
        ) {
          privileges.push(privilege);
        }
      }
      if (listPrivilegeDto.updatedAt != undefined) {
        if (
          privilege.updatedAt.toDateString() ==
          listPrivilegeDto.updatedAt.toDateString()
        ) {
          privileges.push(privilege);
        }
      }
    });

    if (
      privileges.length == 0 &&
      (listPrivilegeDto.createdAt != undefined ||
        listPrivilegeDto.updatedAt != undefined)
    ) {
      throw new HttpException('Privilege not found', HttpStatus.NOT_FOUND);
    } else if (privileges.length != 0) {
      listPrivileges = privileges;
    }

    return await listPrivileges;
  }


  async deletePrivilege(refPrivilege: string, account: AccountEntity) {

    const userAccount = await this.accountRepository.findOneBy({
      refAccount: account.refAccount,
    });
    //Autorisation
    if (!(
      this.IsAuthorised(userAccount, FunctionPrivilegeEnum.DELETE_PRIVILEGE) ||
      userAccount.role.slug == UserRoleEnum.SUPER_ADMIN
      )) {
      throw new UnauthorizedException("You d'ont have the required role or privilege!!! ");
    }

    const privilege = await this.privilegeRepository.findOneBy({
      refPrivilege,
    });
    if (privilege == null) {
      throw new HttpException('Privilege not found', HttpStatus.NOT_FOUND);
    }

    try {
      await this.privilegeRepository.softRemove(privilege);
    } catch (error) {
      throw new ConflictException(error.driverError.detail);
    }
    await this.notificationService.sendNotification(account);

    return privilege;
  }
}
