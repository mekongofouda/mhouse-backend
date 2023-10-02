import { Module } from '@nestjs/common';
import { FollowerService } from './follower.service';
import { FollowerController } from './follower.controller';
import { AccountEntity } from 'src/account/entities/account.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([AccountEntity])
  ],
  controllers: [FollowerController],
  providers: [FollowerService],
})
export class FollowerModule {}
