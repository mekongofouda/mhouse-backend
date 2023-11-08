import { BadRequestException, ConflictException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AddHotelBookingServiceDto } from './dto/add-hotel-booking-service.dto';
import { UpdateHotelBookingServiceDto } from './dto/update-hotel-booking-service.dto';
import { HotelBookingService } from './entities/hotel-booking-service.entity';
import { ListHotelBookingServiceDto } from './dto/list-hotel-booking-service.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AccountEntity } from 'src/resources/account/entities/account.entity';
import { HotelBooking } from '../entities/hotel-booking.entity';

@Injectable()
export class HotelBookingServiceService {
  
    constructor(  
    @InjectRepository(AccountEntity) 
    private readonly accountRepository: Repository<AccountEntity>,

    @InjectRepository(HotelBooking) 
    private readonly hotelBookingRepository: Repository<HotelBooking>,

    @InjectRepository(HotelBookingService) 
    private readonly hotelBookingServiceRepository: Repository<HotelBookingService>,

  ){}

  async addHotelBookingService(addHotelBookingServiceDto: AddHotelBookingServiceDto) {
    //Create the service object with Dto to save it 
    const hotelBooking = await this.hotelBookingRepository.create(addHotelBookingServiceDto); 
    if (hotelBooking == null) {
      throw new BadRequestException("Service not found");
    }

    //Create the homeCare object with Dto to save it 
    const hotelBookingService = await this.hotelBookingServiceRepository.create(addHotelBookingServiceDto); 
    if (hotelBookingService == null) {
      throw new BadRequestException("Service not found");
    }
    hotelBookingService.hotelBooking = hotelBooking; 
    try {
      await this.hotelBookingRepository.save(hotelBookingService);
    } catch (error) {
      throw new ConflictException(error.driverError.detail);
    }
    return hotelBookingService;
  }

  async listHotelBookingService(listHotelBookingRealisationDto: ListHotelBookingServiceDto, account: any) {
    let listHotelBookingServices: HotelBookingService[] = [];
    let hotelBookingServices: HotelBookingService[] = [];

    if (listHotelBookingRealisationDto.refAccount != undefined) {
      const userAccount = await this.accountRepository.findOneBy({refAccount: listHotelBookingRealisationDto.refAccount});
      if (userAccount == null) {
        throw new HttpException("Account not found", HttpStatus.NOT_FOUND);
      } 
      userAccount.services.forEach( service => {
        service.hotelBooking.hotelBookingServices.forEach( hotelBookingRealisation => {
          listHotelBookingServices.push(hotelBookingRealisation)
        });
      });
    } else if (listHotelBookingRealisationDto.all == 1){
      listHotelBookingServices = await this.hotelBookingServiceRepository.find();
    } else {
      const userAccount = await this.accountRepository.findOneBy({refAccount: account.refAccount});
      if (userAccount == null) {
        throw new HttpException("Account not found", HttpStatus.NOT_FOUND);
      } 
        userAccount.services.forEach( service => {
          service.hotelBooking.hotelBookingServices.forEach( hotelBookingRealisation => {
            listHotelBookingServices.push(hotelBookingRealisation)
          });
        });
      }

    if (listHotelBookingRealisationDto.refHotelBooking != undefined) {
      const hotelBooking = await this.hotelBookingRepository.findOneBy({refHotelBooking: listHotelBookingRealisationDto.refHotelBooking});
      if (hotelBooking == null) {
        throw new HttpException("Post not found", HttpStatus.NOT_FOUND);
      } 
      hotelBookingServices = hotelBooking.hotelBookingServices;
      listHotelBookingServices = hotelBooking.hotelBookingServices;
    } 
    listHotelBookingServices.filter(hotelBooking => {
      if (listHotelBookingRealisationDto.createdAt != undefined) {
        if (hotelBooking.createdAt.toDateString() == listHotelBookingRealisationDto.createdAt.toDateString()) {
          if (!hotelBookingServices.includes(hotelBooking)) {
            hotelBookingServices.push(hotelBooking);
          }
        }
      }      
      if (listHotelBookingRealisationDto.updatedAt != undefined) {
        if (hotelBooking.updatedAt.toDateString() == listHotelBookingRealisationDto.updatedAt.toDateString()) {
          if (!hotelBookingServices.includes(hotelBooking)) {
            hotelBookingServices.push(hotelBooking);
          }
        }
      }   
    });

    if ((hotelBookingServices.length == 0) 
    && ((listHotelBookingRealisationDto.createdAt != undefined)
    ||(listHotelBookingRealisationDto.updatedAt != undefined)
    )) {
      throw new HttpException("Like not found", HttpStatus.NOT_FOUND);
    } else if (hotelBookingServices.length != 0) {
      listHotelBookingServices = hotelBookingServices;
    }
    return listHotelBookingServices;
  }

  async showHotelBookingServiceDetail(refHotelBookingService: string) {
    const hotelBookingService = await this.hotelBookingServiceRepository.findOneBy({refHotelBookingService});
    if (hotelBookingService == null) {
      throw new HttpException("Like not found", HttpStatus.NOT_FOUND)
    }    
    return hotelBookingService;
  }

  async updateHotelBookingService(refHotelBookingService: string, updateHotelBookingServiceDto: UpdateHotelBookingServiceDto) {
    const hotelBookingService = await this.hotelBookingServiceRepository.findOne({where:{refHotelBookingService}});
    if (hotelBookingService == null) {
      throw new HttpException("Offer not found", HttpStatus.NOT_FOUND)
    }    
      hotelBookingService    
    try {
      await this.hotelBookingServiceRepository.save(hotelBookingService);
    } catch (error) {
      throw new ConflictException(error.driverError.detail);
    } 
    return hotelBookingService;
  }

  async deleteHotelBookingService(refHotelBookingService: string) {
    const hotelBookingService = await this.hotelBookingServiceRepository.findOneBy({refHotelBookingService});
    if (hotelBookingService == null) {
      throw new HttpException("Offer not found", HttpStatus.NOT_FOUND)
    }   
    try {
      await this.hotelBookingServiceRepository.softRemove(hotelBookingService);
    } catch (error) {
      throw new ConflictException(error.driverError.detail);
    } 
    return hotelBookingService;
  }
}
