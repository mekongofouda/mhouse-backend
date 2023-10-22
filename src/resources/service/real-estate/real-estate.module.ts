import { Module } from '@nestjs/common';
import { RealEstateService } from './real-estate.service';
import { RealEstateController } from './real-estate.controller';
import { RoomModule } from './room/room.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RealEstate } from './entities/real-estate.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([RealEstate]),
    RoomModule
  ],
  controllers: [RealEstateController],
  providers: [RealEstateService]
})
export class RealEstateModule {}
