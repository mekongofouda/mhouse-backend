import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { FollowDto } from './dto/follow.dto';
import { AccountEntity } from 'src/resources/account/entities/account.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ListFollowedDto } from './dto/list-followed.dto';
import { ListFollowerDto } from './dto/list-follower.dto';

@Injectable()
export class FollowerService {
  
  constructor(
    @InjectRepository(AccountEntity) 
    private readonly accountRepository: Repository<AccountEntity>
  ){}

  async follow(followerDto: FollowDto, account: any) {
    return await this.accountRepository.save(followerDto);
  }

  // async toogleFollow(refAccount: string) {
  //   const account = await this.accountRepository.findOne({where:{refAccount}});
  //   if (account == null) {
  //     throw new HttpException("Offer not found", HttpStatus.NOT_FOUND)
  //   }    
  //   return await this.accountRepository.save(account);
  // }

  async listFollower(listFollowerDto: ListFollowerDto, account: AccountEntity) {
    
    let userAccount;
    let listRefFollower: string[];
    let listFollower: AccountEntity[];


    if (listFollowerDto.refAccount != undefined) {
      userAccount = await this.accountRepository.findOneBy({refAccount: listFollowerDto.refAccount});
    } else {
      userAccount =  this.accountRepository.create(account);
    } 

    if (userAccount) {
      listRefFollower = userAccount.followers;
      let i = 0;
      let follower;
      while (i<listRefFollower.length) {
        follower = await this.accountRepository.findOneBy({refAccount: listRefFollower[i]});
        listFollower.push(follower);
        i++;
      }
    } else {
      throw new HttpException("Account not found", HttpStatus.NOT_FOUND)
    }  

    if (listFollowerDto.createdAt != undefined) {
      let accounts:AccountEntity[];
      listFollower.filter(follower => {
        if (follower.createdAt.toISOString() == listFollowerDto.createdAt.toISOString()) {
          accounts.push(follower);
        }
      })
      if (accounts) {
        listFollower = accounts;
      }
    }
    return await listFollower;
  }

  // async listFollowed(listFollowedDto: ListFollowedDto) {
  //   const refAccount = listFollowedDto.refAccount;
  //   const createdAt = listFollowedDto.createdAt;
  //   const updatedAt = listFollowedDto.updatedAt;

  //   const qb = this.accountRepository.createQueryBuilder("account");

  //   qb.select("account")
  //   if (refAccount) {
  //     qb.where("account.refUser = :refUser")
  //     .setParameters({
  //       refAccount
  //     })
  //   }
  //   if (createdAt) {
  //     qb.where("account.createdAt = :createdAt")
  //     .setParameters({
  //       createdAt
  //     })
  //   }
  //   if (updatedAt) {
  //     qb.where("account.updatedAt = :updatedAt")
  //     .setParameters({
  //       updatedAt
  //     })
  //   }
  //   return await qb.getRawMany();
  // }

  // async showFollowerDetail(refAccount: string) {
  //   const account = await this.accountRepository.findOne({where:{refAccount}});
  //   if (account == null) {
  //     throw new HttpException("Account not found", HttpStatus.NOT_FOUND)
  //   }    
  //   return account;
  // }
}
