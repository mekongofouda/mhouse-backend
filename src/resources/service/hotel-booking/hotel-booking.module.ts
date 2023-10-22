import { Module } from '@nestjs/common';
import { HotelBookingService } from './hotel-booking.service';
import { HotelBookingController } from './hotel-booking.controller';
import { HotelBookingServiceModule } from './hotel-booking-service/hotel-booking-service.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HotelBooking } from './entities/hotel-booking.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([HotelBooking]),
    HotelBookingServiceModule
  ],
  controllers: [HotelBookingController],
  providers: [HotelBookingService]
})
export class HotelBookingModule {}
