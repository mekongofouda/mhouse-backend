import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { Message } from './entities/message.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Discussion } from 'src/resources/discussion/entities/discussion.entity';
import { AccountEntity } from '../../account/entities/account.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Message, AccountEntity, Discussion])
  ],
  controllers: [MessageController],
  providers: [MessageService],
})
export class MessageModule {}
