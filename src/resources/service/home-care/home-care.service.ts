import { BadRequestException, ConflictException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AddHomeCareDto } from './dto/add-home-care.dto';
import { UpdateHomeCareDto } from './dto/update-home-care.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { HomeCare } from './entities/home-care.entity';
import { Repository } from 'typeorm';

@Injectable()
export class HomeCareService {

  constructor(  
    @InjectRepository(HomeCare) 
    private readonly homeCareRepository: Repository<HomeCare>
  ){}

  async addHomeCare(addHomeCareDto: AddHomeCareDto) {

    //Create the service object with Dto to save it 
    const service = await this.homeCareRepository.create(addHomeCareDto); 
    if (service == null) {
      throw new BadRequestException("Hare not found");
    }

    try {
      await this.homeCareRepository.save(service);
    } catch (error) {
      throw new ConflictException(error.driverError.detail);
    }
    return service;
  }

  async showHomCareDetail(refHomeCare: string) {
    const service = await this.homeCareRepository.findOneBy({refHomeCare});
    if (!service) {
      throw new HttpException("Service not found", HttpStatus.NOT_FOUND)
    }    
    return service;
  }

  async updateHomCare(refHomeCare: string, updateHomeCareDto: UpdateHomeCareDto) {
    const homeCare = await this.homeCareRepository.findOneBy({refHomeCare});
    if (homeCare == null) {
      throw new HttpException("Service not found", HttpStatus.NOT_FOUND)
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
