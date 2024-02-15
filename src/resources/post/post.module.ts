import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { PostEntity } from './entities/post.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Service } from '../service/entities/service.entity';
import { AccountEntity } from '../account/entities/account.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PostEntity, Service, AccountEntity])],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
