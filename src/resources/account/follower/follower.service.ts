import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AccountEntity } from 'src/resources/account/entities/account.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ListFollowedDto } from './dto/list-followed.dto';
import { ListFollowerDto } from './dto/list-follower.dto';
import { FunctionPrivilegeEnum } from 'src/enums/function.privilege.enum';
import { NotificationService } from 'src/resources/notification/notification.service';
import { Utils } from 'src/generics/utils';

@Injectable()
export class FollowerService extends Utils {
  constructor(
    @InjectRepository(AccountEntity)
    private readonly accountRepository: Repository<AccountEntity>,
    private readonly notificationService: NotificationService,
  ) {
    super();
  }

  async follow(refAccount: string, account: AccountEntity) {
    // Get current user account
    let userAccount = await this.accountRepository.findOneBy({
      refAccount: account.refAccount,
    });

    // Get current user account
    let followed = await this.accountRepository.findOneBy({
      refAccount: refAccount,
    });

    // Test autorisations of the current user
    if (userAccount != null) {
      if (
        this.IsAuthorised(userAccount, FunctionPrivilegeEnum.FOLLOW) == false
      ) {
        throw new UnauthorizedException();
      }
    }

    // Add followed and a follower to the current user
    userAccount.followed.push(refAccount);
    followed.follower.push(userAccount.refAccount);

    // Save the followed account
    try {
      await this.accountRepository.save(followed);
    } catch (error) {
      throw new ConflictException(error.driverError.detail);
    }

    // Save the current account
    try {
      await this.accountRepository.save(userAccount);
    } catch (error) {
      throw new ConflictException(error.driverError.detail);
    }
    await this.notificationService.sendFollowerNotification(userAccount);

    return userAccount;
  }

  async notFollow(refAccount: string, account: AccountEntity) {
    // Get current user account
    const userAccount = await this.accountRepository.findOneBy({
      refAccount: account.refAccount,
    });

    // Get current user account
    const followed = await this.accountRepository.findOneBy({
      refAccount: refAccount,
    });

    // Test autorisations of the current user
    if (userAccount != null) {
      if (
        this.IsAuthorised(userAccount, FunctionPrivilegeEnum.NOT_FOLLOW) ==
        false
      ) {
        throw new UnauthorizedException();
      }
    }

    // Remove followed in the current user followed list
    if (userAccount.followed.includes(refAccount)) {
      const index = userAccount.followed.findIndex((refAccount) => {
        refAccount == refAccount;
      });
      userAccount.followed.splice(index, 1);
    }

    if (followed.follower.includes(userAccount.refAccount)) {
      const index = followed.follower.findIndex((refAccount) => {
        refAccount == userAccount.refAccount;
      });
      followed.follower.splice(index, 1);
    }

    // Save current followed account
    try {
      await this.accountRepository.save(followed);
    } catch (error) {
      throw new ConflictException(error.driverError.detail);
    }

    // Save current user account
    try {
      await this.accountRepository.save(userAccount);
    } catch (error) {
      throw new ConflictException(error.driverError.detail);
    }
    return userAccount;
  }

  async showFollowerDetail(refAccount: string, account: AccountEntity) {
    // Get current user account
    const userAccount = await this.accountRepository.findOneBy({
      refAccount: account.refAccount,
    });

    if (
      this.IsAuthorised(userAccount, FunctionPrivilegeEnum.SHOW_FOLLOWER) ==
      false
    ) {
      throw new UnauthorizedException();
    }

    const followed = await this.accountRepository.findOneBy({
      refAccount: refAccount,
    });

    if (followed == null) {
      throw new HttpException('Followed not found', HttpStatus.NOT_FOUND);
    }

    return followed;
  }

  async listFollower(listFollowerDto: ListFollowerDto, account: AccountEntity) {

    const userAccount = await this.accountRepository.findOneBy({
      refAccount: account.refAccount,
    });
    if (userAccount != null) {
      if (
        this.IsAuthorised(userAccount, FunctionPrivilegeEnum.LIST_FOLLOWER) ==
        false
      ) {
        throw new UnauthorizedException();
      }
    }

    let listFollowers: string[] = [];
    if (listFollowerDto.refAccount != undefined) {
      const user = await this.accountRepository.findOneBy({
        refAccount: listFollowerDto.refAccount,
      });
      if (user != null) {
        listFollowers = user.follower;
      } else {
        throw new HttpException('Account not found', HttpStatus.NOT_FOUND);
      }
    } else {
      listFollowers = account.follower;
    }

    return await listFollowers;
  }

  async listFollowed(listFollowedDto: ListFollowedDto, account: AccountEntity) {

    const userAccount = await this.accountRepository.findOneBy({
      refAccount: account.refAccount,
    });
    
    if (userAccount != null) {
      if (
        this.IsAuthorised(userAccount, FunctionPrivilegeEnum.LIST_FOLLOWED) ==
        false
      ) {
        throw new UnauthorizedException();
      }
    }

    let listFollowed: string[] = [];
    if (listFollowedDto.refAccount != undefined) {
      const user = await this.accountRepository.findOneBy({
        refAccount: listFollowedDto.refAccount,
      });
      if (user != null) {
        listFollowed = user.followed;
      } else {
        throw new HttpException('Account not found', HttpStatus.NOT_FOUND);
      }
    } else {
      listFollowed = account.followed;
    }

    return await listFollowed;
  }
}
