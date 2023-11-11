import { BadRequestException, ConflictException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AddHomeStandingDto } from './dto/add-home-standing.dto';
import { UpdateHomeStandingDto } from './dto/update-home-standing.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HomeStanding } from './entities/home-standing.entity';
import { Service } from '../entities/service.entity';

@Injectable()
export class HomeStandingService {
  
    constructor(  
      @InjectRepository(Service) 
      private readonly serviceRepository: Repository<Service>,

      @InjectRepository(HomeStanding) 
      private readonly homeStandingRepository: Repository<HomeStanding>

    ){}

  async addHomeStanding(addHomeStandingDto: AddHomeStandingDto) {

    //Create the service object with Dto to save it 
    let service = await this.serviceRepository.findOneBy({refService: addHomeStandingDto.refService}); 
    if (service == null) {
      throw new HttpException("Service not found", HttpStatus.NOT_FOUND);
    }

    //Create the homeCare object with Dto to save it 
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

  async showHotelHomeStanding(refHomeStanding: string) {

    const homeStanding = await this.homeStandingRepository.findOneBy({refHomeStanding});
    if (homeStanding == null) {
      throw new HttpException("HomeStanding not found", HttpStatus.NOT_FOUND)
    }    
    return homeStanding;

  }

  async updateHomeStanding(refHomeStanding: string, updateHomeStandingDto: UpdateHomeStandingDto) {

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
