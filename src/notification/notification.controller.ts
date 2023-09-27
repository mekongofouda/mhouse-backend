import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { SendNotificationDto } from './dto/send-notification.dto';
import { MarkReadedDto } from './dto/markReaded-notification.dto';
import { ListNotificationDto } from './dto/list-notification.dto';
import { ReferencePipe } from 'src/pipes/reference/reference.pipe';
import { JwtAuthGuard } from 'src/auth/auth.guard';

@Controller('notification')
export class NotificationController {

  constructor(
    private readonly notificationService: NotificationService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async sendNotification(
    @Body(ReferencePipe) sendNotificationDto: SendNotificationDto
    ) {
    return await this.notificationService.sendNotification(sendNotificationDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async listNotification(
    @Query() listNotificationDto: ListNotificationDto
  ) {
    return await this.notificationService.listNotification(listNotificationDto);
  }

  @Get(':ref')
  @UseGuards(JwtAuthGuard)
  async showNotificationDetail(
    @Param('ref') ref: string
    ) {
    return await this.notificationService.showNotificationDetail(ref);
  }

  @Patch(':ref')
  @UseGuards(JwtAuthGuard)
  async markReaded(
    @Param('ref') ref: string, 
    @Body() markReadedDto: MarkReadedDto
  ) {
    return await this.notificationService.markReaded(ref, markReadedDto);
  }

  @Delete(':ref')
  @UseGuards(JwtAuthGuard)
  async deleteNotification(
    @Param('ref') ref: string
    ) {
    return await this.notificationService.deleteNotification(ref);
  }
}
