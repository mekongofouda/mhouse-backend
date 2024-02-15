import { Module } from '@nestjs/common';
import { LikeService } from './like.service';
import { LikeController } from './like.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Like } from './entities/like.entity';
import { PostEntity } from 'src/resources/post/entities/post.entity';
import { AccountEntity } from '../../account/entities/account.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Like, PostEntity, AccountEntity])],
  controllers: [LikeController],
  providers: [LikeService],
})
export class LikeModule {}
