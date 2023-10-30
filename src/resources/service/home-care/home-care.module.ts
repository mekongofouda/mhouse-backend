import { Module } from '@nestjs/common';
import { HomeCareService } from './home-care.service';
import { HomeCareController } from './home-care.controller';
import { HomeCareRealisationModule } from './home-care-realisation/home-care-realisation.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HomeCare } from './entities/home-care.entity';
import { Service } from '../entities/service.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([HomeCare, Service]),
    HomeCareRealisationModule
  ],
  controllers: [HomeCareController],
  providers: [HomeCareService]
})
export class HomeCareModule {}
