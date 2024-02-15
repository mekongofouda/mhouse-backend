import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AddDiscussionDto } from './dto/add-discussion.dto';
import { UpdateDiscussionDto } from './dto/update-discussion.dto';
import { ListDiscussionDto } from './dto/list-discussion.dto';
import { Discussion } from './entities/discussion.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountEntity } from 'src/resources/account/entities/account.entity';
import { Utils } from 'src/generics/utils';
import { FunctionPrivilegeEnum } from 'src/enums/function.privilege.enum';
import { NotificationService } from 'src/resources/notification/notification.service';

@Injectable()
export class DiscussionService extends Utils {
  constructor(
    @InjectRepository(AccountEntity)
    private readonly accountRepository: Repository<AccountEntity>,

    @InjectRepository(Discussion)
    private readonly discussionRepository: Repository<Discussion>,
    private readonly notificationService: NotificationService,
  ) {
    super();
  }

  async addDiscussion(
    addDiscussionDto: AddDiscussionDto,
    account: any,
  ): Promise<Discussion> {
    const userAccount = await this.accountRepository.findOneBy({
      refAccount: account.refAccount,
    });
    if (userAccount != null) {
      if (
        this.IsAuthorised(userAccount, FunctionPrivilegeEnum.ADD_DISCUSSION) ==
        false
      ) {
        throw new UnauthorizedException();
      }
    }

    const discussion = await this.discussionRepository.create(addDiscussionDto);
    const customerAccount = await this.accountRepository.findOneBy({
      refAccount: addDiscussionDto.refCustomer,
    });
    if (customerAccount == null) {
      throw new HttpException('Account not found', HttpStatus.NOT_FOUND);
    }

    discussion.accounts = [userAccount, customerAccount];

    try {
      await this.discussionRepository.save(discussion);
    } catch (error) {
      throw new ConflictException(error.driverError.detail);
    }

    return discussion;
  }

  async listDiscussion(
    listDiscussionDto: ListDiscussionDto,
    account: any,
  ): Promise<Discussion[]> {
    const userAccount = await this.accountRepository.findOneBy({
      refAccount: account.refAccount,
    });
    if (userAccount != null) {
      if (
        this.IsAuthorised(userAccount, FunctionPrivilegeEnum.ADD_DISCUSSION) ==
        false
      ) {
        throw new UnauthorizedException();
      }
    }

    let listDiscussions: Discussion[] = [];
    const discussions: Discussion[] = [];

    if (listDiscussionDto.refAccount != undefined) {
      const userAccount = await this.accountRepository.findOneBy({
        refAccount: listDiscussionDto.refAccount,
      });
      if (userAccount != null) {
        listDiscussions = userAccount.discussions;
      } else {
        throw new HttpException('Discussion not found', HttpStatus.NOT_FOUND);
      }
    } else if (account.role.slug == 'ADMIN' || 'SUPER_ADMIN') {
      listDiscussions = await this.discussionRepository.find();
    } else {
      listDiscussions = account.discussions;
    }

    listDiscussions.filter((discussion) => {
      if (listDiscussionDto.createdAt != undefined) {
        if (
          discussion.createdAt.toDateString() ==
          listDiscussionDto.createdAt.toDateString()
        ) {
          discussions.push(discussion);
        }
      }
      if (listDiscussionDto.updatedAt != undefined) {
        if (
          discussion.updatedAt.toDateString() ==
          listDiscussionDto.updatedAt.toDateString()
        ) {
          discussions.push(discussion);
        }
      }
    });

    if (
      discussions.length == 0 &&
      (listDiscussionDto.createdAt != undefined ||
        listDiscussionDto.updatedAt != undefined)
    ) {
      throw new HttpException('Discussion not found', HttpStatus.NOT_FOUND);
    } else if (discussions.length != 0) {
      listDiscussions = discussions;
    }

    return listDiscussions;
  }

  async showDiscussionDetail(refDiscussion: string, account: AccountEntity) {
    const userAccount = await this.accountRepository.findOneBy({
      refAccount: account.refAccount,
    });
    if (userAccount != null) {
      if (
        this.IsAuthorised(userAccount, FunctionPrivilegeEnum.SHOW_DISCUSSION) ==
        false
      ) {
        throw new UnauthorizedException();
      }
    }

    const discussion = await this.discussionRepository.findOneBy({
      refDiscussion,
    });
    if (!discussion) {
      throw new HttpException('Discussion not found', HttpStatus.NOT_FOUND);
    }

    return discussion;
  }

  async updateDiscussion(
    refDiscussion: string,
    updateDiscussionDto: UpdateDiscussionDto,
    account: AccountEntity,
  ) {
    const userAccount = await this.accountRepository.findOneBy({
      refAccount: account.refAccount,
    });
    if (userAccount != null) {
      if (
        this.IsAuthorised(
          userAccount,
          FunctionPrivilegeEnum.UPDATE_DISCUSSION,
        ) == false
      ) {
        throw new UnauthorizedException();
      }
    }

    const discussion = await this.discussionRepository.findOneBy({
      refDiscussion,
    });
    if (discussion == null) {
      throw new HttpException('Discussion not found', HttpStatus.NOT_FOUND);
    }

    Object.assign(discussion, updateDiscussionDto);

    try {
      await this.discussionRepository.save(discussion);
    } catch (error) {
      throw new ConflictException(error.driverError.detail);
    }

    return discussion;
  }

  async deleteDiscussion(refDiscussion: string, account: AccountEntity) {
    const userAccount = await this.accountRepository.findOneBy({
      refAccount: account.refAccount,
    });
    if (userAccount != null) {
      if (
        this.IsAuthorised(
          userAccount,
          FunctionPrivilegeEnum.DELETE_DISCUSSION,
        ) == false
      ) {
        throw new UnauthorizedException();
      }
    }

    const discussion = await this.discussionRepository.findOneBy({
      refDiscussion,
    });
    if (discussion == null) {
      throw new HttpException('Discussion not found', HttpStatus.NOT_FOUND);
    }

    try {
      await this.discussionRepository.softRemove(discussion);
    } catch (error) {
      throw new ConflictException(error.driverError.detail);
    }
    await this.notificationService.sendNotification(account);

    return discussion;
  }
}
