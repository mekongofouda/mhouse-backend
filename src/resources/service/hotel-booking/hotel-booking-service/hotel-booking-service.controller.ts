import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HotelBookingServiceService } from './hotel-booking-service.service';
import { CreateHotelBookingServiceDto } from './dto/create-hotel-booking-service.dto';
import { UpdateHotelBookingServiceDto } from './dto/update-hotel-booking-service.dto';

@Controller('hotel-booking-service')
export class HotelBookingServiceController {
  constructor(private readonly hotelBookingServiceService: HotelBookingServiceService) {}

  @Post()
  create(@Body() createHotelBookingServiceDto: CreateHotelBookingServiceDto) {
    return this.hotelBookingServiceService.create(createHotelBookingServiceDto);
  }

  @Get()
  findAll() {
    return this.hotelBookingServiceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.hotelBookingServiceService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHotelBookingServiceDto: UpdateHotelBookingServiceDto) {
    return this.hotelBookingServiceService.update(+id, updateHotelBookingServiceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.hotelBookingServiceService.remove(+id);
  }
}
