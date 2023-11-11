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
    let service = await this.serviceRepository.findOneBy({refService: addHotelBookingDto.refService}); 
    if (service == null) {
      throw new HttpException("Service not found", HttpStatus.NOT_FOUND);
    }

    //Create the hotelBooking object with Dto to save it 
    let hotelBooking = await this.hotelBookingRepository.create(addHotelBookingDto); 
    if (hotelBooking == null) {
      throw new BadRequestException("HotelBooking not found");
    }
    hotelBooking.service = service; 

    try {
      await this.hotelBookingRepository.save(hotelBooking);
    } catch (error) {
      throw new ConflictException(error.driverError.detail);
    }

    return hotelBooking;

  }

  async showHotelBookingDetail(refHotelBooking: string) {
    const hotelBooking = await this.hotelBookingRepository.findOneBy({refHotelBooking});
    if (hotelBooking == null) {
      throw new HttpException("HotelBooking not found", HttpStatus.NOT_FOUND)
    }    
    return hotelBooking;

  }

  async updateHotelBooking(refHotelBooking: string, updateHotelBookingDto: UpdateHotelBookingDto) {

    let hotelBookingService = await this.hotelBookingRepository.findOneBy({refHotelBooking});
    if (hotelBookingService == null) {
      throw new HttpException("HotelBooking not found", HttpStatus.NOT_FOUND)
    }    
    Object.assign(hotelBookingService, updateHotelBookingDto);

    try {
      await this.hotelBookingRepository.save(hotelBookingService);
    } catch (error) {
      throw new ConflictException(error.driverError.detail);
    }

    return hotelBookingService;

  }

}
