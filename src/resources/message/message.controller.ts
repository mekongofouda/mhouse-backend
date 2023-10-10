import { Controller, Get, Post, Body,Param, Delete, Query, UseGuards } from '@nestjs/common';
import { MessageService } from './message.service';
import { SendMessageDto } from './dto/send-message.dto';
import { ListMessageDto } from './dto/list-message.dto';
import { ReferencePipe } from 'src/pipes/reference/reference.pipe';
import { JwtAuthGuard } from 'src/resources/auth/auth.guard';
import { Message } from './entities/message.entity';
import { MhouseResponseInterface } from 'src/interfaces/mhouse-response.interface';

@Controller('message')
export class MessageController {

  constructor(
    private readonly messageService: MessageService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async sendMessage(
    @Body(ReferencePipe) sendMessageDto: SendMessageDto
    ): Promise<MhouseResponseInterface> {
    const data = await this.messageService.sendMessage(sendMessageDto);
    return {
      data: data,
      message: "Message envoyé avec succès",
      code:"200"
    };
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async listMessage(
    @Query() listMessageDto: ListMessageDto
  ): Promise<MhouseResponseInterface> {
    const data = await this.messageService.listMessage(listMessageDto);
    return {
      data: data,
      message: "Liste des messages obtenue avec succès",
      code:"200"
    };
  }

  @Get(':ref')
  @UseGuards(JwtAuthGuard)
  async showMessageDetail(
    @Param('ref') ref: string
    ): Promise<MhouseResponseInterface> {
    const data = await this.messageService.showMessageDetail(ref);
    return {
      data: data,
      message: "Liste des messages obtenue avec succès",
      code:"200"
    };
  }

  // @Delete(':ref')
  // @UseGuards(JwtAuthGuard)
  // async deleteMessage(
  //   @Param('ref') ref: string
  //   ): Promise<Message> {
  //   return await this.messageService.deleteMessage(ref);
  // }
}
