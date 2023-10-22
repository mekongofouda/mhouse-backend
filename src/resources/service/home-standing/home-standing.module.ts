import { Module } from '@nestjs/common';
import { HomeStandingService } from './home-standing.service';
import { HomeStandingController } from './home-standing.controller';
import { HomeStandingRealisationModule } from './home-standing-realisation/home-standing-realisation.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HomeStanding } from './entities/home-standing.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([HomeStanding]),
    HomeStandingRealisationModule
  ],
  controllers: [HomeStandingController],
  providers: [HomeStandingService]
})
export class HomeStandingModule {}
