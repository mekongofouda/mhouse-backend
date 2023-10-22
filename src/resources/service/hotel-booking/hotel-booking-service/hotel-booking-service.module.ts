import { Module } from '@nestjs/common';
import { HotelBookingServiceService } from './hotel-booking-service.service';
import { HotelBookingServiceController } from './hotel-booking-service.controller';

@Module({
  controllers: [HotelBookingServiceController],
  providers: [HotelBookingServiceService],
})
export class HotelBookingServiceModule {}
