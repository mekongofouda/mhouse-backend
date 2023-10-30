import { PartialType } from '@nestjs/mapped-types';
import { AddHotelBookingServiceDto } from './add-hotel-booking-service.dto';

export class UpdateHotelBookingServiceDto extends PartialType(AddHotelBookingServiceDto) {}
