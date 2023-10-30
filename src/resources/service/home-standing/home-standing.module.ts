import { Module } from '@nestjs/common';
import { HomeStandingService } from './home-standing.service';
import { HomeStandingController } from './home-standing.controller';
import { HomeStandingRealisationModule } from './home-standing-realisation/home-standing-realisation.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HomeStanding } from './entities/home-standing.entity';
import { Service } from '../entities/service.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([HomeStanding, Service]),
    HomeStandingRealisationModule
  ],
  controllers: [HomeStandingController],
  providers: [HomeStandingService]
})
export class HomeStandingModule {}
