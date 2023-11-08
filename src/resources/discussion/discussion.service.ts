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

  async addDiscussion(addDiscussionDto: AddDiscussionDto, account: any): Promise<Discussion> {

    const discussion = await this.discussionRepository.create(addDiscussionDto);
    const userAccount = await this.accountRepository.create(account);

    const customerAccount = await this.accountRepository.findOneBy({refAccount: addDiscussionDto.refCustomer});
    if (customerAccount == null) {
      throw new HttpException("Account not found", HttpStatus.NOT_FOUND);
    } 

    discussion.accounts = [userAccount[0], customerAccount];

    try { 
      await this.discussionRepository.save(discussion);
    } catch (error) {
      throw new ConflictException(error.driverError.detail);
    }

    return discussion;
  }

  async listDiscussion(listDiscussionDto: ListDiscussionDto, account: any): Promise<Discussion[]>  {
    
    let listDiscussions: Discussion[]=[];
    let discussions: Discussion[]=[];

    if (listDiscussionDto.refAccount != undefined) {
      const userAccount = await this.accountRepository.findOneBy({refAccount: listDiscussionDto.refAccount});
      if (userAccount != null) {
        listDiscussions = userAccount.discussions;
      } else {
        throw new HttpException("Discussion not found", HttpStatus.NOT_FOUND)
      }  
    } else if (listDiscussionDto.all == 1){
      listDiscussions = await this.discussionRepository.find();
    } else {
      listDiscussions = account.discussions;  
    }

    listDiscussions.filter(discussion => {
      if (listDiscussionDto.createdAt != undefined) {
        if (discussion.createdAt.toDateString() == listDiscussionDto.createdAt.toDateString()) {
          discussions.push(discussion);
        }
      }      
      if (listDiscussionDto.updatedAt != undefined) {
        if (discussion.updatedAt.toDateString() == listDiscussionDto.updatedAt.toDateString()) {
          discussions.push(discussion);
        }
      }   
    });

    if ((discussions.length == 0) 
    && ((listDiscussionDto.createdAt != undefined)||(listDiscussionDto.updatedAt != undefined)
    )) {
      throw new HttpException("Discussion not found", HttpStatus.NOT_FOUND);
    } else if (discussions.length != 0) {
      listDiscussions = discussions;
    }

    return listDiscussions;
    
  }

  async showDiscussionDetail(refDiscussion: string) {

    const discussion = await this.discussionRepository.findOneBy({refDiscussion});
    if (!discussion) {
      throw new HttpException("Discussion not found", HttpStatus.NOT_FOUND)
    }   

    return discussion;
  }

  async updateDiscussion(refDiscussion: string, updateDiscussionDto: UpdateDiscussionDto) {

    const discussion = await this.discussionRepository.findOneBy({refDiscussion});
    if (discussion == null) {
      throw new HttpException("Discussion not found", HttpStatus.NOT_FOUND)
    }    

    Object.assign(discussion, updateDiscussionDto);

    try {
      await this.discussionRepository.save(discussion);
    } catch (error) {
      throw new ConflictException(error.driverError.detail);
    }

    return discussion;

  }

  async deleteDiscussion(refDiscussion: string) {
    
    const discussion = await this.discussionRepository.findOneBy({refDiscussion});
    if (discussion == null) {
      throw new HttpException("Discussion not found", HttpStatus.NOT_FOUND);
    }  

    try {
      await this.discussionRepository.softRemove(discussion);
    } catch (error) {
      throw new ConflictException(error.driverError.detail);
    }

    return discussion;
  }
}
