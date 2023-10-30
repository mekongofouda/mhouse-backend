import { Injectable } from '@nestjs/common';
import { AddHotelBookingServiceDto } from './dto/add-hotel-booking-service.dto';
import { UpdateHotelBookingServiceDto } from './dto/update-hotel-booking-service.dto';

@Injectable()
export class HotelBookingServiceService {
  
  async addHotelBookingService(addHotelBookingServiceDto: AddHotelBookingServiceDto) {
    return 'This action adds a new hotelBookingService';
  }

  async listHotelBookingService() {
    return `This action returns all hotelBookingService`;
  }

  async showHotelBookingServiceDetail(refHotelBookingService: string) {
    return `This action returns a #${refHotelBookingService} hotelBookingService`;
  }

  async updateHotelBookingService(refHotelBookingService: string, updateHotelBookingServiceDto: UpdateHotelBookingServiceDto) {
    return `This action updates a #${refHotelBookingService} hotelBookingService`;
  }

  async deleteHotelBookingService(refHotelBookingService: string) {
    return `This action removes a #${refHotelBookingService} hotelBookingService`;
  }
}
