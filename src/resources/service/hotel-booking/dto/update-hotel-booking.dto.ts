import { PartialType } from '@nestjs/mapped-types';
import { AddHotelBookingDto } from './add-hotel-booking.dto';

export class UpdateHotelBookingDto extends PartialType(AddHotelBookingDto) {}
