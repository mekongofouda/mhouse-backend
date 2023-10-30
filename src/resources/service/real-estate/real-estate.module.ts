import { Module } from '@nestjs/common';
import { RealEstateService } from './real-estate.service';
import { RealEstateController } from './real-estate.controller';
import { RoomModule } from './room/room.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RealEstate } from './entities/real-estate.entity';
import { Service } from '../entities/service.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([RealEstate, Service]),
    RoomModule
  ],
  controllers: [RealEstateController],
  providers: [RealEstateService]
})
export class RealEstateModule {}
