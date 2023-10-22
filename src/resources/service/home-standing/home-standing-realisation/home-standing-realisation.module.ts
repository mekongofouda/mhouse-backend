import { Module } from '@nestjs/common';
import { HomeStandingRealisationService } from './home-standing-realisation.service';
import { HomeStandingRealisationController } from './home-standing-realisation.controller';

@Module({
  controllers: [HomeStandingRealisationController],
  providers: [HomeStandingRealisationService],
})
export class HomeStandingRealisationModule {}
