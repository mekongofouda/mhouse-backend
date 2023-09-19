import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, HttpException, Query } from '@nestjs/common';
import { MessageService } from './message.service';
import { SendMessageDto } from './dto/send-message.dto';
import { ListMessageDto } from './dto/list-message.dto';
import { ReferencePipe } from 'src/pipes/reference/reference.pipe';
import { DatePipe } from 'src/pipes/date/date.pipe';

@Controller('message')
export class MessageController {

  constructor(
    private readonly messageService: MessageService,
  ) {}

  @Post()
  sendMessage(
    @Body(ReferencePipe, DatePipe) sendMessageDto: SendMessageDto
    ) {
    return this.messageService.sendMessage(sendMessageDto);
  }

  @Get()
  listMessage(
    @Query() listMessageDto: ListMessageDto
  ) {
    if (!this.messageService.listMessage(listMessageDto)) {
      throw new HttpException("Message not found", HttpStatus.NOT_FOUND)
    }
    return this.messageService.listMessage(listMessageDto);
  }

  @Get(':ref')
  showMessageDetail(
    @Param('ref') ref: string
    ) {
    if (!this.messageService.showMessageDetail(ref)) {
      throw new HttpException("Message not found", HttpStatus.NOT_FOUND)
    }
    return this.messageService.showMessageDetail(ref);
  }

  @Delete(':ref')
  deleteMessage(
    @Param('ref') ref: string
    ) {
    return this.messageService.deleteMessage(ref);
  }
}
