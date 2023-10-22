import { Injectable } from '@nestjs/common';
import { CreateHotelBookingServiceDto } from './dto/create-hotel-booking-service.dto';
import { UpdateHotelBookingServiceDto } from './dto/update-hotel-booking-service.dto';

@Injectable()
export class HotelBookingServiceService {
  create(createHotelBookingServiceDto: CreateHotelBookingServiceDto) {
    return 'This action adds a new hotelBookingService';
  }

  findAll() {
    return `This action returns all hotelBookingService`;
  }

  findOne(id: number) {
    return `This action returns a #${id} hotelBookingService`;
  }

  update(id: number, updateHotelBookingServiceDto: UpdateHotelBookingServiceDto) {
    return `This action updates a #${id} hotelBookingService`;
  }

  remove(id: number) {
    return `This action removes a #${id} hotelBookingService`;
  }
}
