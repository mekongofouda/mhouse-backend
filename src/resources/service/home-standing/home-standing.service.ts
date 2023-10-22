import { BadRequestException, ConflictException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AddHomeStandingDto } from './dto/add-home-standing.dto';
import { UpdateHomeStandingDto } from './dto/update-home-standing.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HomeStanding } from './entities/home-standing.entity';

@Injectable()
export class HomeStandingService {
  
    constructor(  
      @InjectRepository(HomeStanding) 
      private readonly homeStandingRepository: Repository<HomeStanding>
    ){}

  async addHomeStanding(addHomeStandingDto: AddHomeStandingDto) {

    //Create the service object with Dto to save it 
    const service = await this.homeStandingRepository.create(addHomeStandingDto); 
    if (service == null) {
      throw new BadRequestException("Hare not found");
    }

    try {
      await this.homeStandingRepository.save(service);
    } catch (error) {
      throw new ConflictException(error.driverError.detail);
    }
    return service;
  }

  async showHotelHomeStanding(refHomeStanding: string) {
    const service = await this.homeStandingRepository.findOneBy({refHomeStanding});
    if (!service) {
      throw new HttpException("Service not found", HttpStatus.NOT_FOUND)
    }    
    return service;
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
