import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, Query } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { SendNotificationDto } from './dto/send-notification.dto';
import { MarkReadedDto } from './dto/markReaded-notification.dto';
import { ListNotificationDto } from './dto/list-notification.dto';
import { ReferencePipe } from 'src/pipes/reference/reference.pipe';
import { DatePipe } from 'src/pipes/date/date.pipe';

@Controller('notification')
export class NotificationController {

  constructor(
    private readonly notificationService: NotificationService,
  ) {}

  @Post()
  sendNotification(
    @Body(ReferencePipe, DatePipe) sendNotificationDto: SendNotificationDto
    ) {
    return this.notificationService.sendNotification(sendNotificationDto);
  }

  @Get()
  listNotification(
    @Query() listNotificationDto: ListNotificationDto
  ) {
    if (!this.notificationService.listNotification(listNotificationDto)) {
      throw new HttpException("Notification not found", HttpStatus.NOT_FOUND)
    }
    return this.notificationService.listNotification(listNotificationDto);
  }

  @Get(':ref')
  showNotificationDetail(
    @Param('ref') ref: string
    ) {
    if (!this.notificationService.showNotificationDetail(ref)) {
      throw new HttpException("Notification not found", HttpStatus.NOT_FOUND)
    }
    return this.notificationService.showNotificationDetail(ref);
  }

  @Patch(':ref')
  markReaded(
    @Param('ref') ref: string, 
    @Body() markReadedDto: MarkReadedDto
  ) {
    return this.notificationService.markReaded(ref, markReadedDto);
  }

  @Delete(':ref')
  deleteNotification(
    @Param('ref') ref: string
    ) {
    return this.notificationService.deleteNotification(ref);
  }
}
