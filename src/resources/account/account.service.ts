import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InviteUserDto } from './dto/invite-user.dto';
import { UpdateUserAccountDto } from './dto/update-user-account.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountEntity } from './entities/account.entity';
import { ListUserAccountDto } from './dto/list-user-account.dto';
import { Role } from '../role/entities/role.entity';
import { isDefined } from 'class-validator';


@Injectable()
export class AccountService {

  constructor(
    @InjectRepository(Role) 
    private readonly roleRepository: Repository<Role>,
    @InjectRepository(AccountEntity) 
    private readonly accountRepository: Repository<AccountEntity>
  ){}

  // async invite(inviteUserDto: InviteUserDto) {
    
  //   return 'This action adds a new account';
  // }

  async listUserAccount(listUserAccountDto: ListUserAccountDto) {

    let listUserAccount: AccountEntity[];

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

    if (listUserAccountDto.createdAt != undefined) {
      let accounts:AccountEntity[];
      listUserAccount.filter(account => {
        if (account.createdAt.toISOString() == listUserAccountDto.createdAt.toISOString()) {
          accounts.push(account);
        }
      })
      if (accounts) {
        listUserAccount = accounts;
      }
    }

    if (listUserAccountDto.updatedAt == undefined) {
      let accounts:AccountEntity[]=[];
      listUserAccount.filter(account => {
        if (account.updatedAt.toISOString() == listUserAccountDto.updatedAt.toISOString()) {
          accounts.push(account);
        }
      })
      if (accounts) {
        listUserAccount = accounts;
      }
    }

    return await listUserAccount;
  }
  
  // async getUserDetail(refAccount: string) {
  //   return await this.accountRepository.findOneBy({refAccount});
  // }

  async showUserProfile(refAccount: string) {
    const account = await this.accountRepository.findOneBy({refAccount});
    if (account == null) {
      throw new HttpException("Profile not found", HttpStatus.NOT_FOUND)
    }    
    return account;
  }

  // async updateUserAccount(refAccount: string, updateUserAccountDto: UpdateUserAccountDto) {
  //   const account = await this.accountRepository.findOne({where:{refAccount}});
  //   if (account == null) {
  //     throw new HttpException("Account not found", HttpStatus.NOT_FOUND)
  //   }    
  //   Object.assign(account, updateUserAccountDto);
  //   return await this.accountRepository.save(account);
  // }

  async deleteUserAcoount(refAccount: string) {
    const account = await this.accountRepository.findOneBy({refAccount});
    if (account == null) {
      throw new HttpException("Account not found", HttpStatus.NOT_FOUND)
    }    
    return await this.accountRepository.softRemove(account);
  }
}
