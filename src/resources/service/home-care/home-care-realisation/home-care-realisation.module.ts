import { Module } from '@nestjs/common';
import { HomeCareRealisationService } from './home-care-realisation.service';
import { HomeCareRealisationController } from './home-care-realisation.controller';

@Module({
  controllers: [HomeCareRealisationController],
  providers: [HomeCareRealisationService],
})
export class HomeCareRealisationModule {}
