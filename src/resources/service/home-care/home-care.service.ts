import { BadRequestException, ConflictException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AddHomeCareDto } from './dto/add-home-care.dto';
import { UpdateHomeCareDto } from './dto/update-home-care.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { HomeCare } from './entities/home-care.entity';
import { Repository } from 'typeorm';
import { Service } from '../entities/service.entity';

@Injectable()
export class HomeCareService {

  constructor(  
    @InjectRepository(Service) 
    private readonly serviceRepository: Repository<Service>,

    @InjectRepository(HomeCare) 
    private readonly homeCareRepository: Repository<HomeCare>
  ){}

  async addHomeCare(addHomeCareDto: AddHomeCareDto) {

    //Create the service object with Dto to save it 
    const service = await this.serviceRepository.create(addHomeCareDto); 
    if (service == null) {
      throw new BadRequestException("HomeCare not found");
    }

    //Create the homeCare object with Dto to save it 
    const homeCare = await this.homeCareRepository.create(addHomeCareDto); 
    if (service == null) {
      throw new BadRequestException("HomeCare not found");
    }
    homeCare.service = service; 
    try {
      await this.homeCareRepository.save(homeCare);
    } catch (error) {
      throw new ConflictException(error.driverError.detail);
    }
    return service;
  }

  async showHomCareDetail(refHomeCare: string) {
    const service = await this.homeCareRepository.findOneBy({refHomeCare});
    if (service == null) {
      throw new HttpException("Service not found", HttpStatus.NOT_FOUND)
    }    
    return service;
  }

  async updateHomCare(refHomeCare: string, updateHomeCareDto: UpdateHomeCareDto) {
    const homeCare = await this.homeCareRepository.findOneBy({refHomeCare});
    if (homeCare == null) {
      throw new HttpException("Homecare not found", HttpStatus.NOT_FOUND)
    }    
    Object.assign(homeCare, updateHomeCareDto);
    try {
      await this.homeCareRepository.save(homeCare);
    } catch (error) {
      throw new ConflictException(error.driverError.detail);
    }
    return homeCare;
  }

}
