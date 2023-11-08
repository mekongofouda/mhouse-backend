import { Module } from '@nestjs/common';
import { HomeStandingRealisationService } from './home-standing-realisation.service';
import { HomeStandingRealisationController } from './home-standing-realisation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HomeStandingRealisation } from './entities/home-standing-realisation.entity';
import { HomeStanding } from '../entities/home-standing.entity';
import { AccountEntity } from 'src/resources/account/entities/account.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([HomeStanding, HomeStandingRealisation, AccountEntity])
  ],
  controllers: [HomeStandingRealisationController],
  providers: [HomeStandingRealisationService],
})
export class HomeStandingRealisationModule {}
