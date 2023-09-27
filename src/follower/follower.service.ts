import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { FollowDto } from './dto/follow.dto';
import { UpdateFollowerDto } from './dto/update-follower.dto';
import { Account } from 'src/account/entities/account.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ListFollowedDto } from './dto/list-followed.dto';

@Injectable()
export class FollowerService {
  
  constructor(
    @InjectRepository(Account) 
    private readonly accountRepository: Repository<Account>
  ){}

  async follow(followerDto: FollowDto) {
    return await this.accountRepository.save(followerDto);
  }

  async toogleFollow(refAccount: string) {
    const account = await this.accountRepository.findOne({where:{refAccount}});
    if (account == null) {
      throw new HttpException("Offer not found", HttpStatus.NOT_FOUND)
    }    
    return await this.accountRepository.save(account);
  }

  async listFollower(listFollowedDto: ListFollowedDto) {
    const refUser = listFollowedDto.refAccount;
    const createdAt = listFollowedDto.createdAt;
    const updatedAt = listFollowedDto.updatedAt;

    const qb = this.accountRepository.createQueryBuilder("account");

    qb.select("account")
    if (refUser) {
      qb.where("account.refUser = :refUser")
      .setParameters({
        refUser
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
    return await qb.getRawMany();
  }

  async listFollowed(listFollowedDto: ListFollowedDto) {
    const refAccount = listFollowedDto.refAccount;
    const createdAt = listFollowedDto.createdAt;
    const updatedAt = listFollowedDto.updatedAt;

    const qb = this.accountRepository.createQueryBuilder("account");

    qb.select("account")
    if (refAccount) {
      qb.where("account.refUser = :refUser")
      .setParameters({
        refAccount
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
    return await qb.getRawMany();
  }

  async showFollowerDetail(refAccount: string) {
    const account = await this.accountRepository.findOne({where:{refAccount}});
    if (account == null) {
      throw new HttpException("Account not found", HttpStatus.NOT_FOUND)
    }    
    return account;
  }
}
