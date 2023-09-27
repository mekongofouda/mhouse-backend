import { Controller, Get, Post, Body,Param, Delete, Query, UseGuards } from '@nestjs/common';
import { MessageService } from './message.service';
import { SendMessageDto } from './dto/send-message.dto';
import { ListMessageDto } from './dto/list-message.dto';
import { ReferencePipe } from 'src/pipes/reference/reference.pipe';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { Message } from './entities/message.entity';

@Controller('message')
export class MessageController {

  constructor(
    private readonly messageService: MessageService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async sendMessage(
    @Body(ReferencePipe) sendMessageDto: SendMessageDto
    ): Promise<Message> {
    return await this.messageService.sendMessage(sendMessageDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async listMessage(
    @Query() listMessageDto: ListMessageDto
  ): Promise<Message[]> {
    return await this.messageService.listMessage(listMessageDto);
  }

  @Get(':ref')
  @UseGuards(JwtAuthGuard)
  async showMessageDetail(
    @Param('ref') ref: string
    ): Promise<Message> {
    return await this.messageService.showMessageDetail(ref);
  }

  @Delete(':ref')
  @UseGuards(JwtAuthGuard)
  async deleteMessage(
    @Param('ref') ref: string
    ): Promise<Message> {
    return await this.messageService.deleteMessage(ref);
  }
}
