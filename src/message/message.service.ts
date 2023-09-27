import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { SendMessageDto } from './dto/send-message.dto';
import { ListMessageDto} from './dto/list-message.dto';
import { Message } from './entities/message.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class MessageService {

  constructor(
    @InjectRepository(Message) 
    private readonly messageRepository: Repository<Message>
  ){}

  async sendMessage(sendMessageDto: SendMessageDto): Promise<Message> {
    return await this.messageRepository.save(sendMessageDto);
  }

  async listMessage(listMessageDto: ListMessageDto): Promise<Message[]>{
    const refUser = listMessageDto.refUser;
    const refDiscussion = listMessageDto.refDiscussion;
    const createdAt = listMessageDto.createdAt;
    const updatedAt = listMessageDto.updatedAt;

    const qb = this.messageRepository.createQueryBuilder("message");

    qb.select("message")
    if (refUser) {
      qb.where("message.refUser = :refUser")
      .setParameters({
        refUser
      })
    }
    if (refDiscussion) {
      qb.andWhere("message.refDiscussion = :refDiscussion")
      .setParameters({
        refDiscussion
      })
    }
    if (createdAt) {
      qb.where("message.createdAt = :createdAt")
      .setParameters({
        createdAt
      })
    }
    if (updatedAt) {
      qb.where("message.updatedAt = :updatedAt")
      .setParameters({
        updatedAt
      })
    }
    return await qb.getRawMany();
  }

  async showMessageDetail(refMessage: string) {
    const message = await this.messageRepository.findOne({where:{refMessage}});
    console.log(message);
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
    return await this.messageRepository.softRemove(message);
  }
}
