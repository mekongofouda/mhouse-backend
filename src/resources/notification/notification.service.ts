import { Injectable } from '@nestjs/common';
import { SendNotificationDto } from './dto/send-notification.dto';
import { MarkReadedDto } from './dto/markReaded-notification.dto';
import { ListNotificationDto } from './dto/list-notification.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from './entities/notification.entity';

@Injectable()
export class NotificationService {

  constructor(
    @InjectRepository(Notification) 
    private readonly notificationRepository: Repository<Notification>
  ){}

  sendNotification(sendNotificationDto: SendNotificationDto) {
    return 'This action adds a new notification';
  }

  async listNotification(listNotificationDto: ListNotificationDto): Promise<Notification[]>{
    return await this.notificationRepository.find();
  }

  showNotificationDetail(refNotification: string) {
    return `This action returns a #${refNotification} notification`;
  }

  markReaded(refNotification: string, markReadedDto: MarkReadedDto) {
    return `This action updates a #${refNotification} notification`;
  }

  deleteNotification(refNotification: string) {
    return `This action removes a #${refNotification} notification`;
  }
}
