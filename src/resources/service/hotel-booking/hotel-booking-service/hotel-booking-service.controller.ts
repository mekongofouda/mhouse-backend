import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, HttpStatus } from '@nestjs/common';
import { HotelBookingServiceService } from './hotel-booking-service.service';
import { AddHotelBookingServiceDto } from './dto/add-hotel-booking-service.dto';
import { UpdateHotelBookingServiceDto } from './dto/update-hotel-booking-service.dto';
import { Account } from 'src/decorators/account.decorator';
import { ListHotelBookingServiceDto } from './dto/list-hotel-booking-service.dto';
import { MhouseResponseInterface } from 'src/interfaces/mhouse-response.interface';
import { JwtAuthGuard } from 'src/resources/account/auth/auth.guard';
import { ReferencePipe } from 'src/pipes/reference/reference.pipe';
import { AccountEntity } from 'src/resources/account/entities/account.entity';

@Controller('hotel-booking-service')
export class HotelBookingServiceController {
  constructor(private readonly hotelBookingServiceService: HotelBookingServiceService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async addHotelBookingService(
    @Body(ReferencePipe) addHotelBookingServiceDto: AddHotelBookingServiceDto,













    @Account() account
    ): Promise<MhouseResponseInterface> {
    const data = await this.hotelBookingServiceService.addHotelBookingService(addHotelBookingServiceDto, account);
    return {
      data: data,
      message: "Partage effectué avec succès",
      code: HttpStatus.OK
    };
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async listHotelBookingService(
    @Query() listHotelBookingServiceDto: ListHotelBookingServiceDto,
    @Account() account
    ): Promise<MhouseResponseInterface> {
    const data = await this.hotelBookingServiceService.listHotelBookingService(listHotelBookingServiceDto, account);
    return {
      data: data,
      message: "Partage effectué avec succès",
      code: HttpStatus.OK
    };
  }

  @Get(':ref')
  @UseGuards(JwtAuthGuard)
  async showHotelBookingServiceDetail(
    @Param('ref')ref: string,
    @Account() account: AccountEntity
    ): Promise<MhouseResponseInterface> {
    const data = await this.hotelBookingServiceService.showHotelBookingServiceDetail(ref, account);
    return {
      data: data,
      message: "Partage effectué avec succès",
      code: HttpStatus.OK
    };
  }

  @Patch(':ref')
  @UseGuards(JwtAuthGuard)
  async updateHotelBookingService(
    @Param('ref')ref: string, 
    @Body() updateHotelBookingServiceDto: UpdateHotelBookingServiceDto,
    @Account() account: AccountEntity
    ): Promise<MhouseResponseInterface> {
    const data = await this.hotelBookingServiceService.updateHotelBookingService(ref, updateHotelBookingServiceDto, account);
    return {
      data: data,
      message: "Partage effectué avec succès",
      code: HttpStatus.OK
    };
  }

  @Delete(':ref')
  @UseGuards(JwtAuthGuard)
  async deleteHotelBookingService(
    @Param('ref')ref: string,
    @Account() account: AccountEntity
    ): Promise<MhouseResponseInterface> {
    const data = await this.hotelBookingServiceService.deleteHotelBookingService(ref, account);
    return {
      data: data,
      message: "Partage effectué avec succès",
      code: HttpStatus.OK
    };
  }
}
