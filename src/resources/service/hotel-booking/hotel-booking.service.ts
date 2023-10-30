import { BadRequestException, ConflictException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AddHotelBookingDto } from './dto/add-hotel-booking.dto';
import { UpdateHotelBookingDto } from './dto/update-hotel-booking.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HotelBooking } from './entities/hotel-booking.entity';
import { Service } from '../entities/service.entity';

@Injectable()
export class HotelBookingService {

  constructor(  
    @InjectRepository(Service) 
    private readonly serviceRepository: Repository<Service>,

    @InjectRepository(HotelBooking) 
    private readonly hotelBookingRepository: Repository<HotelBooking>
  ){}

  async addHotelBooking(addHotelBookingDto: AddHotelBookingDto) {
    
    //Create the service object with Dto to save it 
    const service = await this.serviceRepository.create(addHotelBookingDto); 
    if (service == null) {
      throw new BadRequestException("Service not found");
    }

    //Create the hotelBooking object with Dto to save it 
    const hotelBooking = await this.hotelBookingRepository.create(addHotelBookingDto); 
    if (service == null) {
      throw new BadRequestException("HotelBooking not found");
    }
    hotelBooking.service = service; 
    try {
      await this.hotelBookingRepository.save(hotelBooking);
    } catch (error) {
      throw new ConflictException(error.driverError.detail);
    }
    return service;
  }

  async showHotelBookingDetail(refHotelBooking: string) {
    const service = await this.hotelBookingRepository.findOneBy({refHotelBooking});
    if (service == null) {
      throw new HttpException("HotelBooking not found", HttpStatus.NOT_FOUND)
    }    
    return service;
  }

  async updateHotelBooking(refHotelBooking: string, updateHotelBookingDto: UpdateHotelBookingDto) {
    const service = await this.hotelBookingRepository.findOneBy({refHotelBooking});
    if (service == null) {
      throw new HttpException("HotelBooking not found", HttpStatus.NOT_FOUND)
    }    
    Object.assign(service, updateHotelBookingDto);
    try {
      await this.hotelBookingRepository.save(service);
    } catch (error) {
      throw new ConflictException(error.driverError.detail);
    }
    return service;
  }

}
