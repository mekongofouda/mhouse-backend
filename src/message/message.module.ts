import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { Message } from './entities/message.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Discussion } from 'src/discussion/entities/discussion.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Message, Discussion])
  ],
  controllers: [MessageController],
  providers: [MessageService],
})
export class MessageModule {}
