import { Module } from '@nestjs/common';
import { RoomService } from './room.service';
import { RoomController } from './room.controller';
import { Room } from './entities/room.entity';
import { RealEstate } from '../entities/real-estate.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([Room, RealEstate])
  ],
  controllers: [RoomController],
  providers: [RoomService],
})
export class RoomModule {}
