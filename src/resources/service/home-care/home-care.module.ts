import { Module } from '@nestjs/common';
import { HomeCareService } from './home-care.service';
import { HomeCareController } from './home-care.controller';

@Module({
  controllers: [HomeCareController],
  providers: [HomeCareService],
})
export class HomeCareModule {}
