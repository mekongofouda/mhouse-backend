import { ConflictException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InviteUserDto } from './dto/invite-user.dto';
import { UpdateUserAccountDto } from './dto/update-user-account.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountEntity } from './entities/account.entity';
import { ListUserAccountDto } from './dto/list-user-account.dto';
import { Role } from '../role/entities/role.entity';
import * as bcrypt  from 'bcrypt';


@Injectable()
export class AccountService {

  constructor(
    @InjectRepository(Role) 
    private readonly roleRepository: Repository<Role>,
    @InjectRepository(AccountEntity) 
    private readonly accountRepository: Repository<AccountEntity>
  ){}

  async invite(inviteUserDto: InviteUserDto) {
    return 'This action invites a new account';
  }

  async listUserAccount(listUserAccountDto: ListUserAccountDto) {

    let listUserAccount: AccountEntity[]=[];
    let accounts: AccountEntity[]=[];

    if (listUserAccountDto.refRole != undefined) {
      const role = await this.roleRepository.findOneBy({refRole: listUserAccountDto.refRole});
      if (role) {
        listUserAccount = role.accounts;
      } else {
        throw new HttpException("Role not found", HttpStatus.NOT_FOUND)
      }  
    } else {
      listUserAccount = await this.accountRepository.find();
    }
    
    listUserAccount.filter(account => {
      if (listUserAccountDto.createdAt != undefined) {
        if (account.createdAt.toDateString() == listUserAccountDto.createdAt.toDateString()) {
          accounts.push(account);
        }
      }      
      if (listUserAccountDto.updatedAt != undefined) {
        if (account.updatedAt.toDateString() == listUserAccountDto.updatedAt.toDateString()) {
          accounts.push(account);
        }
      }   
    });

    if ((accounts.length == 0) 
    && ((listUserAccountDto.createdAt != undefined)||(listUserAccountDto.updatedAt != undefined)
    )) {
      throw new HttpException("Account not found", HttpStatus.NOT_FOUND);
    } else if (accounts.length != 0) {
      listUserAccount = accounts;
    }

    return await listUserAccount;
  }
  
  async getHome(account: any) {

    const posts  = account.posts;
    return await posts;
    
  }

  async showUserProfile(refAccount: string) {
    const account = await this.accountRepository.findOneBy({refAccount});
    if (account == null) {
      throw new HttpException("Profile not found", HttpStatus.NOT_FOUND)
    }    
    return account;
  }

  async updateUserAccount(refAccount: string, updateUserAccountDto: UpdateUserAccountDto) {
    const account = await this.accountRepository.findOne({where:{refAccount}});
    if (account == null) {
      throw new HttpException("Account not found", HttpStatus.NOT_FOUND)
    }    
    Object.assign(account, updateUserAccountDto);
    try {
      await this.accountRepository.save(account);
    } catch (error) {
      throw new ConflictException(error.driverError.detail);
    }
    return account;
  }

  async deleteUserAcoount(refAccount: string) {
    const account = await this.accountRepository.findOneBy({refAccount});
    if (account == null) {
      throw new HttpException("Account not found", HttpStatus.NOT_FOUND)
    }    
    try {
      await this.accountRepository.softRemove(account)
    } catch (error) { 
      throw new ConflictException(error.driverError.detail);
    }
    return account ;
  }
}
