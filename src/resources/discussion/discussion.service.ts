import { ConflictException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AddDiscussionDto } from './dto/add-discussion.dto';
import { UpdateDiscussionDto } from './dto/update-discussion.dto';
import { ListDiscussionDto } from './dto/list-discussion.dto';
import { Discussion } from './entities/discussion.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountEntity } from 'src/resources/account/entities/account.entity';

@Injectable()
export class DiscussionService {

  constructor(
    @InjectRepository(AccountEntity) 
    private readonly accountRepository: Repository<AccountEntity>,

    @InjectRepository(Discussion) 
    private readonly discussionRepository: Repository<Discussion>,

  ){}

  async addDiscussion(addDiscussionDto: AddDiscussionDto, account: any): Promise<Discussion>  {
    const discussion = await this.discussionRepository.create(addDiscussionDto);
    discussion.accounts = [account];
    try {
      await this.discussionRepository.save(discussion);
    } catch (error) {
      throw new ConflictException(error.driverError.detail);
    }
    return discussion;
  }

  async listDiscussion(listDiscussionDto: ListDiscussionDto, account: any): Promise<Discussion[]>  {
    const userAccount = await this.accountRepository.findOneBy({refAccount: account.refAccount});
    if (userAccount == null) {
      throw new HttpException("Account not found", HttpStatus.NOT_FOUND);
    }
    const discussions: Discussion[] = [];

    userAccount.discussions.filter(discussion => {
      if (listDiscussionDto.createdAt = discussion.createdAt) {
        discussions.push(discussion);
      }    
      if (listDiscussionDto.updatedAt = discussion.updatedAt) {
        discussions.push(discussion);
      }    
    });
    return await discussions;
  }

  async showDiscussionDetail(refDiscussion: string) {
    const discussion = await this.discussionRepository.findOneBy({refDiscussion});
    if (!discussion) {
      throw new HttpException("Discussion not found", HttpStatus.NOT_FOUND)
    }    
    return discussion;
  }

  // async updateDiscussion(refDiscussion: string, updateDiscussionDto: UpdateDiscussionDto) {
  //   const discussion = await this.discussionRepository.findOne({where:{refDiscussion}});
  //   if (discussion == null) {
  //     throw new HttpException("Discussion not found", HttpStatus.NOT_FOUND)
  //   }    
  //   Object.assign(discussion, updateDiscussionDto);
  //   return await this.discussionRepository.save(discussion);
  // }

  // async deleteDiscussion(refDiscussion: string) {
  //   const discussion = await this.discussionRepository.findOneBy({refDiscussion});
  //   if (discussion == null) {
  //     throw new HttpException("Discussion not found", HttpStatus.NOT_FOUND)
  //   }    
  //   return await this.discussionRepository.softRemove(discussion);
  // }
}
