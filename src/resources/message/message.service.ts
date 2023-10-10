import { BadRequestException, ConflictException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { SendMessageDto } from './dto/send-message.dto';
import { ListMessageDto} from './dto/list-message.dto';
import { Message } from './entities/message.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Discussion } from 'src/resources/discussion/entities/discussion.entity';

@Injectable()
export class MessageService {

  constructor(
    @InjectRepository(Discussion) 
    private readonly discussionRepository: Repository<Discussion>,
    
    @InjectRepository(Message) 
    private readonly messageRepository: Repository<Message>

  ){}

  async sendMessage(sendMessageDto: SendMessageDto): Promise<Message> {
    //Get discussion to add at the message
    const discussion = await this.discussionRepository.findOneBy({refDiscussion: sendMessageDto.refDiscussion});
    if (!discussion) {
      throw new HttpException("Discussion not found", HttpStatus.NOT_FOUND)
    }

    //Create the like object whit dto to save it 
    const message = await this.messageRepository.create(sendMessageDto); 
    if (!message) {
      throw new BadRequestException("Post not found");
    }
    
    //Set properties
    message.discussion = discussion;

    try {
      await this.messageRepository.save(message);
    } catch (error) {
      throw new ConflictException("L'email et le numéro de téléphone doivent être déjà utilisés");
    }
    return message;
  }

  async listMessage(listMessageDto: ListMessageDto): Promise<Message[]>{
    const discussion = await this.discussionRepository.findOneBy({refDiscussion: listMessageDto.refDiscussion});
    let listMessages: Message[] = [];
    if (discussion == null) {
      throw new HttpException("Post not found", HttpStatus.NOT_FOUND);
    }
    listMessages = discussion.messages;
    return await listMessages;
  }

  async showMessageDetail(refMessage: string) {
    const message = await this.messageRepository.findOneBy({refMessage});
    if (message == null) {
      throw new HttpException("Message not found", HttpStatus.NOT_FOUND)
    }    
    return message;
  }

  // async deleteMessage(refMessage: string) {
  //   const message = await this.messageRepository.findOneBy({refMessage});
  //   if (message == null) {
  //     throw new HttpException("Message not found", HttpStatus.NOT_FOUND)
  //   }    
  //   return await this.messageRepository.softRemove(message);
  // }
}
