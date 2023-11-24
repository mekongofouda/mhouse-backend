import { BadRequestException, ConflictException, HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { AddHotelBookingDto } from './dto/add-hotel-booking.dto';
import { UpdateHotelBookingDto } from './dto/update-hotel-booking.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HotelBooking } from './entities/hotel-booking.entity';
import { Service } from '../entities/service.entity';
import { Utils } from 'src/generics/utils';
import { AccountEntity } from 'src/resources/account/entities/account.entity';
import { FunctionPrivilegeEnum } from 'src/enums/function.privilege.enum';

@Injectable()
export class HotelBookingService extends Utils {

  constructor(  

    @InjectRepository(AccountEntity) 
    private readonly accountRepository: Repository<AccountEntity>,

    @InjectRepository(Service) 
    private readonly serviceRepository: Repository<Service>,

    @InjectRepository(HotelBooking) 
    private readonly hotelBookingRepository: Repository<HotelBooking>

  ){
    super()
  }

  async addHotelBooking(addHotelBookingDto: AddHotelBookingDto, account: AccountEntity) {
    
    const userAccount = await this.accountRepository.findOneBy({refAccount: account.refAccount});
    if(userAccount != null) {
      if (this.IsAuthorised(userAccount, FunctionPrivilegeEnum.ADD_DISCUSSION) == false) {
        throw new UnauthorizedException();
      }
    }

    let service = await this.serviceRepository.findOneBy({refService: addHotelBookingDto.refService}); 
    if (service == null) {
      throw new HttpException("Service not found", HttpStatus.NOT_FOUND);
    }

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

  async showHotelBookingDetail(refHotelBooking: string, account: AccountEntity) {

    const userAccount = await this.accountRepository.findOneBy({refAccount: account.refAccount});
    if(userAccount != null) {
      if (this.IsAuthorised(userAccount, FunctionPrivilegeEnum.ADD_DISCUSSION) == false) {
        throw new UnauthorizedException();
      }
    }

    const hotelBooking = await this.hotelBookingRepository.findOneBy({refHotelBooking});
    if (hotelBooking == null) {
      throw new HttpException("HotelBooking not found", HttpStatus.NOT_FOUND)
    }    

    return hotelBooking;

  }

  async updateHotelBooking(refHotelBooking: string, updateHotelBookingDto: UpdateHotelBookingDto, account: AccountEntity) {

    const userAccount = await this.accountRepository.findOneBy({refAccount: account.refAccount});
    if(userAccount != null) {
      if (this.IsAuthorised(userAccount, FunctionPrivilegeEnum.ADD_DISCUSSION) == false) {
        throw new UnauthorizedException();
      }
    }

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
