import { PartialType } from '@nestjs/mapped-types';
import { CreateHotelBookingServiceDto } from './create-hotel-booking-service.dto';

export class UpdateHotelBookingServiceDto extends PartialType(CreateHotelBookingServiceDto) {}
