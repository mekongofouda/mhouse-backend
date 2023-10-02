import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InviteUserDto } from './dto/invite-user.dto';
import { UpdateUserAccountDto } from './dto/update-user-account.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountEntity } from './entities/account.entity';
import { ListUserAccountDto } from './dto/list-user-account.dto';


@Injectable()
export class AccountService {

  constructor(
    @InjectRepository(AccountEntity) 
    private readonly accountRepository: Repository<AccountEntity>
  ){}

  async invite(inviteUserDto: InviteUserDto) {
    
    return 'This action adds a new account';
  }

  async listUserAccount(listUserAccountDto: ListUserAccountDto) {

    const refRole = listUserAccountDto.refRole;
    const createdAt = listUserAccountDto.createdAt;
    const updatedAt = listUserAccountDto.updatedAt;

    const qb = this.accountRepository.createQueryBuilder("account");

    if (refRole) {
      qb.andWhere("account.refRole = :refRole")
      .setParameters({
        refRole
      })
    }

    if (createdAt) {
      qb.where("account.createdAt = :createdAt")
      .setParameters({
        createdAt
      })
    }
    
    if (updatedAt) {
      qb.where("account.updatedAt = :updatedAt")
      .setParameters({
        updatedAt
      })
    }
    return await qb.getMany();

  }
  
  async getUserDetail(refAccount: string) {
    return await this.accountRepository.findOneBy({refAccount});
  }

  async showUserProfile(refAccount: string) {
    return await this.accountRepository.findOne({where:{refAccount}});
  }

  async updateUserAccount(refAccount: string, updateUserAccountDto: UpdateUserAccountDto) {
    const account = await this.accountRepository.findOne({where:{refAccount}});
    if (account == null) {
      throw new HttpException("Account not found", HttpStatus.NOT_FOUND)
    }    
    Object.assign(account, updateUserAccountDto);
    return await this.accountRepository.save(account);
  }

  async deleteUserAcoount(refAccount: string) {
    const account = await this.accountRepository.findOneBy({refAccount});
    if (account == null) {
      throw new HttpException("Account not found", HttpStatus.NOT_FOUND)
    }    
    return await this.accountRepository.softRemove(account);
  }
}
