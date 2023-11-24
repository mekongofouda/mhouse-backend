import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';
import { Notification } from './entities/notification.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountEntity } from '../account/entities/account.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Notification, AccountEntity])
  ],
  controllers: [NotificationController],
  providers: [NotificationService],
})
export class NotificationModule {}
