import { Module } from '@nestjs/common';
import { FollowerService } from './follower.service';
import { FollowerController } from './follower.controller';
import { Account } from 'src/account/entities/account.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([Account])
  ],
  controllers: [FollowerController],
  providers: [FollowerService],
})
export class FollowerModule {}
