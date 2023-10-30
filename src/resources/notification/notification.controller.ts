import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, HttpStatus } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { SendNotificationDto } from './dto/send-notification.dto';
import { MarkReadedDto } from './dto/markReaded-notification.dto';
import { ListNotificationDto } from './dto/list-notification.dto';
import { ReferencePipe } from 'src/pipes/reference/reference.pipe';
import { JwtAuthGuard } from 'src/resources/account/auth/auth.guard';
import { MhouseResponseInterface } from 'src/interfaces/mhouse-response.interface';

@Controller('notification')
export class NotificationController {

  constructor(
    private readonly notificationService: NotificationService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async sendNotification(
    @Body(ReferencePipe) sendNotificationDto: SendNotificationDto
    ): Promise<MhouseResponseInterface> {
    const data = await this.notificationService.sendNotification(sendNotificationDto);
    return {
      data: data,
      message: "Discussion créée avec succès",
      code: HttpStatus.OK
    };
  }

  // @Get()
  // @UseGuards(JwtAuthGuard)
  // async listNotification(
  //   @Query() listNotificationDto: ListNotificationDto
  // ): Promise<MhouseResponseInterface> {
  //   return await this.notificationService.listNotification(listNotificationDto);
  // }

  // @Get(':ref')
  // @UseGuards(JwtAuthGuard)
  // async showNotificationDetail(
  //   @Param('ref') ref: string
  // ): Promise<MhouseResponseInterface> {
  //   return await this.notificationService.showNotificationDetail(ref);
  // }

  // @Patch(':ref')
  // @UseGuards(JwtAuthGuard)
  // async markReaded(
  //   @Param('ref') ref: string, 
  //   @Body() markReadedDto: MarkReadedDto
  // ): Promise<MhouseResponseInterface> {
  //   return await this.notificationService.markReaded(ref, markReadedDto);
  // }

  // @Delete(':ref')
  // @UseGuards(JwtAuthGuard)
  // async deleteNotification(
  //   @Param('ref') ref: string
  // ): Promise<MhouseResponseInterface> {
  //   return await this.notificationService.deleteNotification(ref);
  // }
}
