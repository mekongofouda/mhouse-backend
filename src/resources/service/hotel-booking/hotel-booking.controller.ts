import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpStatus } from '@nestjs/common';
import { HotelBookingService } from './hotel-booking.service';
import { AddHotelBookingDto } from './dto/add-hotel-booking.dto';
import { UpdateHotelBookingDto } from './dto/update-hotel-booking.dto';
import { ReferencePipe } from 'src/pipes/reference/reference.pipe';
import { JwtAuthGuard } from 'src/resources/account/auth/auth.guard';
import { MhouseResponseInterface } from 'src/interfaces/mhouse-response.interface';

@Controller('hotel-booking')
export class HotelBookingController {
  constructor(private readonly hotelBookingService: HotelBookingService) {}

  @Post()
    @UseGuards(JwtAuthGuard)
    async addHotelBooking(
    @Body(ReferencePipe) addHotelBookingDto: AddHotelBookingDto
    ): Promise<MhouseResponseInterface> {
     const data = await this.hotelBookingService.addHotelBooking(addHotelBookingDto);
     return {
      data: data,
      message: "Hotel booking ajouté avec succès",
      code: HttpStatus.OK
    }
  }

  @Get(':ref')
    @UseGuards(JwtAuthGuard)
    async showHotelBookingDetail(
    @Param('ref') ref: string
    ): Promise<MhouseResponseInterface> {
     const data = await this.hotelBookingService.showHotelBookingDetail(ref);
     return {
      data: data,
      message: "Partage effectué avec succès",
      code: HttpStatus.OK
    }
  }

  @Patch(':ref')
    @UseGuards(JwtAuthGuard)
    async updateHotelBooking(
    @Param('ref') ref: string, 
    @Body() updateHotelBookingDto: UpdateHotelBookingDto
    ): Promise<MhouseResponseInterface> {
    const data = await this.hotelBookingService.updateHotelBooking(ref, updateHotelBookingDto);
    return {
      data: data,
      message: "Hotel booking mis à jour avec succès",
      code: HttpStatus.OK
    }
  }

}
