import { Module } from '@nestjs/common';
import { RealEstateService } from './real-estate.service';
import { RealEstateController } from './real-estate.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RealEstate } from './entities/real-estate.entity';
import { Service } from '../entities/service.entity';
import { AccountEntity } from 'src/resources/account/entities/account.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([RealEstate, Service, AccountEntity]),
  ],
  controllers: [RealEstateController],
  providers: [RealEstateService],
})
export class RealEstateModule {}
