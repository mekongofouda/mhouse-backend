import { Injectable } from '@nestjs/common';
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

  sendMessage(sendMessageDto: SendMessageDto) {
    return 'This action adds a new message';
  }

  async listMessage(listMessageDto: ListMessageDto): Promise<Message[]>{
    return await this.messageRepository.find();
  }

  showMessageDetail(refMessage: string) {
    return `This action returns a #${refMessage} message`;
  }

  deleteMessage(refMessage: string) {
    return `This action removes a #${refMessage} message`;
  }
}
