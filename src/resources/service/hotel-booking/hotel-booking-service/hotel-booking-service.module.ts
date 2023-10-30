import { Module } from '@nestjs/common';
import { HotelBookingServiceService } from './hotel-booking-service.service';
import { HotelBookingServiceController } from './hotel-booking-service.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HotelBooking } from '../entities/hotel-booking.entity';
import { HotelBookingService } from './entities/hotel-booking-service.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([HotelBooking, HotelBookingService])
  ],
  controllers: [HotelBookingServiceController],
  providers: [HotelBookingServiceService],
})
export class HotelBookingServiceModule {}
