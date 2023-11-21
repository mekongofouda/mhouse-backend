import { Module } from '@nestjs/common';
import { UpgradingService } from './upgrading.service';
import { UpgradingController } from './upgrading.controller';

@Module({
  controllers: [UpgradingController],
  providers: [UpgradingService],
})
export class UpgradingModule {}
