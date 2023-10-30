import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HotelBookingServiceService } from './hotel-booking-service.service';
import { AddHotelBookingServiceDto } from './dto/add-hotel-booking-service.dto';
import { UpdateHotelBookingServiceDto } from './dto/update-hotel-booking-service.dto';

@Controller('hotel-booking-service')
export class HotelBookingServiceController {
  constructor(private readonly hotelBookingServiceService: HotelBookingServiceService) {}

  @Post()
  addHotelBookingService(
    @Body() addHotelBookingServiceDto: AddHotelBookingServiceDto
    ) {
    return this.hotelBookingServiceService.addHotelBookingService(addHotelBookingServiceDto);
  }

  @Get()
  findAll() {
    return this.hotelBookingServiceService.listHotelBookingService();
  }

  @Get(':id')
  findOne(
    @Param('ref')ref: string) {
    return this.hotelBookingServiceService.showHotelBookingServiceDetail(ref);
  }

  @Patch(':id')
  update(
    @Param('ref')ref: string, 
    @Body() updateHotelBookingServiceDto: UpdateHotelBookingServiceDto) {
    return this.hotelBookingServiceService.updateHotelBookingService(ref, updateHotelBookingServiceDto);
  }

  @Delete(':id')
  remove(
    @Param('ref')ref: string) {
    return this.hotelBookingServiceService.deleteHotelBookingService(ref);
  }
}
