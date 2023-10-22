import { BadRequestException, ConflictException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { SendMessageDto } from './dto/send-message.dto';
import { ListMessageDto} from './dto/list-message.dto';
import { Message } from './entities/message.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Discussion } from 'src/resources/discussion/entities/discussion.entity';
import { AccountEntity } from '../../account/entities/account.entity';

@Injectable()
export class MessageService {

  constructor(
    @InjectRepository(AccountEntity) 
    private readonly accountRepository: Repository<AccountEntity>,
    
    @InjectRepository(Discussion) 
    private readonly discussionRepository: Repository<Discussion>,

    @InjectRepository(Message) 
    private readonly messageRepository: Repository<Message>

  ){}

  async sendMessage(sendMessageDto: SendMessageDto): Promise<Message> {
    //Get discussion to add at the message
    const discussion = await this.discussionRepository.findOneBy({refDiscussion: sendMessageDto.refDiscussion});
    if (discussion == null) {
      throw new HttpException("Discussion not found", HttpStatus.NOT_FOUND)
    }

    //Create the like object whit dto to save it 
    const message = await this.messageRepository.create(sendMessageDto); 
    if (message == null) {
      throw new BadRequestException("Message not found");
    }
    
    //Set properties
    message.discussion = discussion;

    try {
      await this.messageRepository.save(message);
    } catch (error) {
      throw new ConflictException(error.driverError.detail);
    }
    return message;
  }

  async listMessage(listMessageDto: ListMessageDto, account: any): Promise<Message[]>{

    let listMessages: Message[]=[];
    let messages: Message[]=[];

    if (listMessageDto.refAccount != undefined) {
      const userAccount = await this.accountRepository.findOneBy({refAccount: listMessageDto.refAccount});
      if (userAccount == null) {
        throw new HttpException("Account not found", HttpStatus.NOT_FOUND);
      } 
      userAccount.discussions.filter(discussion => {
        listMessages.concat(discussion.messages)
      });
    } else if (listMessageDto.all == 1){
      listMessages = await this.messageRepository.find();
    } else {
      account.discussions.filter(discussion => {
        listMessages.concat(discussion.messages)
      });
    }

    if (listMessageDto.refDiscussion != undefined) {
      const discussion = await this.discussionRepository.findOneBy({refDiscussion: listMessageDto.refDiscussion});
      if (discussion == null) {
        throw new HttpException("Service not found", HttpStatus.NOT_FOUND);
      } 
      listMessages.filter(message => {
        if (message.discussion == discussion) {
            messages.push(message);
        }      
      });
      listMessages = messages;
    } 
    listMessages.filter(post => {
      if (listMessageDto.createdAt != undefined) {
        if (post.createdAt.toDateString() == listMessageDto.createdAt.toDateString()) {
          messages.push(post);
        }
      }      
      if (listMessageDto.updatedAt != undefined) {
        if (post.updatedAt.toDateString() == listMessageDto.updatedAt.toDateString()) {
          messages.push(post);
        }
      }   
    });

    if ((messages.length == 0) 
    && ((listMessageDto.createdAt != undefined)||(listMessageDto.updatedAt != undefined))
    ) {
      throw new HttpException("Message not found", HttpStatus.NOT_FOUND);
    } else if (messages.length != 0) {
      listMessages = messages;
    }
    return await listMessages;
  }

  async showMessageDetail(refMessage: string) {
    const message = await this.messageRepository.findOneBy({refMessage});
    if (message == null) {
      throw new HttpException("Message not found", HttpStatus.NOT_FOUND)
    }    
    return message;
  }

  async deleteMessage(refMessage: string) {
    const message = await this.messageRepository.findOneBy({refMessage});
    if (message == null) {
      throw new HttpException("Message not found", HttpStatus.NOT_FOUND)
    }    
    try {
      await this.messageRepository.softRemove(message);
    } catch (error) {
      throw new ConflictException(error.driverError.detail);
    }
    return message;
  }
}
