import { Controller, Get, Post, Body,Param, Delete, Query, UseGuards, HttpStatus } from '@nestjs/common';
import { MessageService } from './message.service';
import { SendMessageDto } from './dto/send-message.dto';
import { ListMessageDto } from './dto/list-message.dto';
import { ReferencePipe } from 'src/pipes/reference/reference.pipe';
import { JwtAuthGuard } from 'src/resources/account/auth/auth.guard';
import { Message } from './entities/message.entity';
import { MhouseResponseInterface } from 'src/interfaces/mhouse-response.interface';
import { Account } from 'src/decorators/account.decorator';
import { AccountEntity } from '../../account/entities/account.entity';

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
      code: HttpStatus.OK
    };
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async listMessage(
    @Query() listMessageDto: ListMessageDto,
    @Account() account: AccountEntity
  ): Promise<MhouseResponseInterface> {
    const data = await this.messageService.listMessage(listMessageDto, account);
    return {
      data: data,
      message: "Liste des messages obtenue avec succès",
      code: HttpStatus.OK
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
      code: HttpStatus.OK
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
