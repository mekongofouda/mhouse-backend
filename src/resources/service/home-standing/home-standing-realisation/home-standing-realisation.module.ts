import { Module } from '@nestjs/common';
import { HomeStandingRealisationService } from './home-standing-realisation.service';
import { HomeStandingRealisationController } from './home-standing-realisation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HomeStandingRealisation } from './entities/home-standing-realisation.entity';
import { HomeStanding } from '../entities/home-standing.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([HomeStanding, HomeStandingRealisation])
  ],
  controllers: [HomeStandingRealisationController],
  providers: [HomeStandingRealisationService],
})
export class HomeStandingRealisationModule {}
