import { BadRequestException, ConflictException, HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { AddHotelBookingServiceDto } from './dto/add-hotel-booking-service.dto';
import { UpdateHotelBookingServiceDto } from './dto/update-hotel-booking-service.dto';
import { HotelBookingService } from './entities/hotel-booking-service.entity';
import { ListHotelBookingServiceDto } from './dto/list-hotel-booking-service.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AccountEntity } from 'src/resources/account/entities/account.entity';
import { HotelBooking } from '../entities/hotel-booking.entity';
import { Utils } from 'src/generics/utils';
import { FunctionPrivilegeEnum } from 'src/enums/function.privilege.enum';

@Injectable()
export class HotelBookingServiceService extends  Utils {
  
    constructor(  
      
    @InjectRepository(AccountEntity) 
    private readonly accountRepository: Repository<AccountEntity>,

    @InjectRepository(HotelBooking) 
    private readonly hotelBookingRepository: Repository<HotelBooking>,

    @InjectRepository(HotelBookingService) 
    private readonly hotelBookingServiceRepository: Repository<HotelBookingService>,

  ){
    super()
  }

  async addHotelBookingService(addHotelBookingServiceDto: AddHotelBookingServiceDto, account: AccountEntity) {

    const userAccount = await this.accountRepository.findOneBy({refAccount: account.refAccount});
    if(userAccount != null) {
      if (this.IsAuthorised(userAccount, FunctionPrivilegeEnum.ADD_DISCUSSION) == false) {
        throw new UnauthorizedException();
      }
    }

    const hotelBooking = await this.hotelBookingRepository.findOneBy({refHotelBooking: addHotelBookingServiceDto.refHotelBooking}); 
    if (hotelBooking == null) {
      throw new BadRequestException("HotelBooking not found");
    }

    const hotelBookingService = await this.hotelBookingServiceRepository.create(addHotelBookingServiceDto); 
    if (hotelBookingService == null) {
      throw new BadRequestException("HotelBookingService not found");
    }
    hotelBookingService.hotelBooking = hotelBooking; 

    try {
      await this.hotelBookingServiceRepository.save(hotelBookingService);
    } catch (error) {
      throw new ConflictException(error.driverError.detail);
    }

    return hotelBookingService;

  }

  async listHotelBookingService(listHotelBookingRealisationDto: ListHotelBookingServiceDto, account: any) {

    const userAccount = await this.accountRepository.findOneBy({refAccount: account.refAccount});
    if(userAccount != null) {
      if (this.IsAuthorised(userAccount, FunctionPrivilegeEnum.ADD_DISCUSSION) == false) {
        throw new UnauthorizedException();
      }
    }

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
        throw new HttpException("HotelBooking not found", HttpStatus.NOT_FOUND);
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
      throw new HttpException("HotelBookingService not found", HttpStatus.NOT_FOUND);
    } else if (hotelBookingServices.length != 0) {
      listHotelBookingServices = hotelBookingServices;
    }

    return listHotelBookingServices;

  }

  async showHotelBookingServiceDetail(refHotelBookingService: string, account: AccountEntity) {

    const userAccount = await this.accountRepository.findOneBy({refAccount: account.refAccount});
    if(userAccount != null) {
      if (this.IsAuthorised(userAccount, FunctionPrivilegeEnum.ADD_DISCUSSION) == false) {
        throw new UnauthorizedException();
      }
    }

    const hotelBookingService = await this.hotelBookingServiceRepository.findOneBy({refHotelBookingService});
    if (hotelBookingService == null) {
      throw new HttpException("HotelBookingService not found", HttpStatus.NOT_FOUND)
    }    

    return hotelBookingService;

  }

  async updateHotelBookingService(refHotelBookingService: string, updateHotelBookingServiceDto: UpdateHotelBookingServiceDto, account: AccountEntity) {

    const userAccount = await this.accountRepository.findOneBy({refAccount: account.refAccount});
    if(userAccount != null) {
      if (this.IsAuthorised(userAccount, FunctionPrivilegeEnum.ADD_DISCUSSION) == false) {
        throw new UnauthorizedException();
      }
    }

    const hotelBookingService = await this.hotelBookingServiceRepository.findOneBy({refHotelBookingService});
    if (hotelBookingService == null) {
      throw new HttpException("HotelBookingService not found", HttpStatus.NOT_FOUND)
    }    
    Object.assign(hotelBookingService, updateHotelBookingServiceDto);

    try {
      await this.hotelBookingServiceRepository.save(hotelBookingService);
    } catch (error) {
      throw new ConflictException(error.driverError.detail);
    } 

    return hotelBookingService;

  }

  async deleteHotelBookingService(refHotelBookingService: string, account: AccountEntity) {

    const userAccount = await this.accountRepository.findOneBy({refAccount: account.refAccount});
    if(userAccount != null) {
      if (this.IsAuthorised(userAccount, FunctionPrivilegeEnum.ADD_DISCUSSION) == false) {
        throw new UnauthorizedException();
      }
    }

    const hotelBookingService = await this.hotelBookingServiceRepository.findOneBy({refHotelBookingService});
    if (hotelBookingService == null) {
      throw new HttpException("HotelBookingService not found", HttpStatus.NOT_FOUND)
    }   

    try {
      await this.hotelBookingServiceRepository.softRemove(hotelBookingService);
    } catch (error) {
      throw new ConflictException(error.driverError.detail);
    } 

    return hotelBookingService;
  }
}
