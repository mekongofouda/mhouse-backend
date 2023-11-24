import { BadRequestException, ConflictException, HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { AddHomeStandingDto } from './dto/add-home-standing.dto';
import { UpdateHomeStandingDto } from './dto/update-home-standing.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HomeStanding } from './entities/home-standing.entity';
import { Service } from '../entities/service.entity';
import { FunctionPrivilegeEnum } from 'src/enums/function.privilege.enum';
import { AccountEntity } from 'src/resources/account/entities/account.entity';
import { Utils } from 'src/generics/utils';

@Injectable()
export class HomeStandingService extends Utils {
  
    constructor(  

      @InjectRepository(AccountEntity) 
      private readonly accountRepository: Repository<AccountEntity>,

      @InjectRepository(Service) 
      private readonly serviceRepository: Repository<Service>,

      @InjectRepository(HomeStanding) 
      private readonly homeStandingRepository: Repository<HomeStanding>

    ){
      super()
    }

  async addHomeStanding(addHomeStandingDto: AddHomeStandingDto, account: AccountEntity) {

    const userAccount = await this.accountRepository.findOneBy({refAccount: account.refAccount});
    if(userAccount != null) {
      if (this.IsAuthorised(userAccount, FunctionPrivilegeEnum.ADD_DISCUSSION) == false) {
        throw new UnauthorizedException();
      }
    }

    let service = await this.serviceRepository.findOneBy({refService: addHomeStandingDto.refService}); 
    if (service == null) {
      throw new HttpException("Service not found", HttpStatus.NOT_FOUND);
    }

    let homeStanding = await this.homeStandingRepository.create(addHomeStandingDto); 
    if (homeStanding == null) {
      throw new BadRequestException("Service not found");
    }
    homeStanding.service = service; 

    try {
      await this.homeStandingRepository.save(homeStanding);
    } catch (error) {
      throw new ConflictException(error.driverError.detail);
    }

    return homeStanding;

  }

  async showHotelHomeStanding(refHomeStanding: string, account: AccountEntity) {

    const userAccount = await this.accountRepository.findOneBy({refAccount: account.refAccount});
    if(userAccount != null) {
      if (this.IsAuthorised(userAccount, FunctionPrivilegeEnum.ADD_DISCUSSION) == false) {
        throw new UnauthorizedException();
      }
    } 

    const homeStanding = await this.homeStandingRepository.findOneBy({refHomeStanding});
    if (homeStanding == null) {
      throw new HttpException("HomeStanding not found", HttpStatus.NOT_FOUND)
    }    

    return homeStanding;

  }

  async updateHomeStanding(refHomeStanding: string, updateHomeStandingDto: UpdateHomeStandingDto, account: AccountEntity) {

    const userAccount = await this.accountRepository.findOneBy({refAccount: account.refAccount});
    if(userAccount != null) {
      if (this.IsAuthorised(userAccount, FunctionPrivilegeEnum.ADD_DISCUSSION) == false) {
        throw new UnauthorizedException();
      }
    }

    const homeStanding = await this.homeStandingRepository.findOneBy({refHomeStanding});
    if (homeStanding == null) {
      throw new HttpException("HomeStanding not found", HttpStatus.NOT_FOUND)
    }    
    Object.assign(homeStanding, updateHomeStandingDto);

    try {
      await this.homeStandingRepository.save(homeStanding);
    } catch (error) {
      throw new ConflictException(error.driverError.detail);
    }

    return homeStanding;

  }
}
