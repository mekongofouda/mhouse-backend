import { Module } from '@nestjs/common';
import { DiscussionService } from './discussion.service';
import { DiscussionController } from './discussion.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Discussion } from './entities/discussion.entity';
import { AccountEntity } from 'src/resources/account/entities/account.entity';
import { Message } from '../discussion/message/entities/message.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Discussion, Message, AccountEntity])
  ],
  controllers: [DiscussionController],
  providers: [DiscussionService],
})
export class DiscussionModule {}
 