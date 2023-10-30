import { ConflictException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
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

  async follow(refAccount: string, account: any) {
    const userAccount = await this.accountRepository.findOneBy({refAccount});
    if (userAccount == null) {
      throw new HttpException("Account not found", HttpStatus.NOT_FOUND);
    }    

    const myAccount = await this.accountRepository.create(account)[0];
    myAccount.followed.push(userAccount.refAccount);

    try {
      await this.accountRepository.save(myAccount);
    } catch (error) { 
      throw new ConflictException(error.driverError.detail);
    }
    return myAccount;
  }

  async notFollow(refAccount: string, account: any) {
    const userAccount = await this.accountRepository.findOne({where:{refAccount}});
    if (userAccount == null) {
      throw new HttpException("Account not found", HttpStatus.NOT_FOUND);
    }    
    const myAccount = await this.accountRepository.create(account)[0];
    const index = myAccount.followed.findIndex(refAccount => {
      refAccount == userAccount.refAccount;
    })
    console.log(index);
    myAccount.followed.includes(userAccount.refAccount)
    myAccount.followed.splice(index, 1);

    try {
      await this.accountRepository.save(myAccount);
    } catch (error) { 
      throw new ConflictException(error.driverError.detail);
    }
    return myAccount;
  }

  async showFollowerDetail(refAccount: string) {
    const follower = await this.accountRepository.findOneBy({refAccount});
    if (follower == null) {
      throw new HttpException("Discussion not found", HttpStatus.NOT_FOUND)
    }    
    return follower;
  }

  async listFollower(listFollowerDto: ListFollowerDto, account: AccountEntity) {

    let listFollowers: AccountEntity[]=[];
    let userAccount: AccountEntity;

    if (listFollowerDto.refAccount != undefined) {
      userAccount = await this.accountRepository.findOneBy({refAccount: listFollowerDto.refAccount});
    } else {
      userAccount =  this.accountRepository.create(account);
    } 

    if (userAccount) {
      let listRefFollower = userAccount.followed;
      let i = 0;
      let follower;
      while (i<listRefFollower.length) {
        follower = await this.accountRepository.findOneBy({refAccount: listRefFollower[i]});
        listFollowers.push(follower);
        i++;
      }
    } else {
      throw new HttpException("Account not found", HttpStatus.NOT_FOUND)
    }  

    if (listFollowerDto.createdAt != undefined) {
      let followers:AccountEntity[];
      listFollowers.filter(follower => {
        if (follower.createdAt.toISOString() == listFollowerDto.createdAt.toISOString()) {
          followers.push(follower);
        }
      })
      if (followers) {
        listFollowers = followers;
      }
    }

    return await listFollowers;
  }

  async listFollowed(listFollowedDto: ListFollowedDto, account: AccountEntity) {

    let listFollowed: AccountEntity[]=[];
    let userAccount: AccountEntity;

    if (listFollowedDto.refAccount != undefined) {
      userAccount = await this.accountRepository.findOneBy({refAccount: listFollowedDto.refAccount});
    } else {
      userAccount =  this.accountRepository.create(account);
    } 

    if (userAccount) {
      let listRefFollower = userAccount.followed;
      let i = 0;
      let follower;
      while (i<listRefFollower.length) {
        follower = await this.accountRepository.findOneBy({refAccount: listRefFollower[i]});
        listFollowed.push(follower);
        i++;
      }
    } else {
      throw new HttpException("Account not found", HttpStatus.NOT_FOUND)
    }  

    if (listFollowedDto.createdAt != undefined) {
      let followers:AccountEntity[];
      listFollowed.filter(follower => {
        if (follower.createdAt.toISOString() == listFollowedDto.createdAt.toISOString()) {
          followers.push(follower);
        }
      })
      if (followers) {
        listFollowed = followers;
      }
    }
  }
}
