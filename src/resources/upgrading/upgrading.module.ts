import { Module } from '@nestjs/common';
import { UpgradingService } from './upgrading.service';
import { UpgradingController } from './upgrading.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountEntity } from '../account/entities/account.entity';
import { Upgrading } from './entities/upgrading.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Upgrading, AccountEntity]),
  ],
  controllers: [UpgradingController],
  providers: [UpgradingService],
})
export class UpgradingModule {}
