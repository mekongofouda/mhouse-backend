import { BadRequestException, ConflictException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AddRealEstateDto } from './dto/add-real-estate.dto';
import { UpdateRealEstateDto } from './dto/update-real-estate.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Service } from '../entities/service.entity';
import { Repository } from 'typeorm';
import { RealEstate } from './entities/real-estate.entity';

@Injectable()
export class RealEstateService {

  constructor(  
    @InjectRepository(RealEstate) 
    private readonly realEstateRepository: Repository<RealEstate>
  ){}

  async addRealEstate(addRealEstateDto: AddRealEstateDto) {

    //Create the service object with Dto to save it 
    const realEstate = await this.realEstateRepository.create(addRealEstateDto); 
    if (realEstate == null) {
      throw new HttpException("real estate not found", HttpStatus.NOT_FOUND);
    }

    try {
      await this.realEstateRepository.save(realEstate);
    } catch (error) {
      throw new ConflictException(error.driverError.detail);
    }
    return realEstate;
  }

  async showRealEstateDetail(refRealEstate: string) {
    const realEstate = await this.realEstateRepository.findOneBy({refRealEstate});
    if (realEstate == null) {
      throw new HttpException("Service not found", HttpStatus.NOT_FOUND)
    }    
    return realEstate;
  }

  async updateRealEstate(refRealEstate: string, updateRealEstateDto: UpdateRealEstateDto) {
    const realEstate = await this.realEstateRepository.findOneBy({refRealEstate});
    if (realEstate == null) {
      throw new HttpException("Service not found", HttpStatus.NOT_FOUND)
    }    
    Object.assign(realEstate, updateRealEstateDto);
    try {
      await this.realEstateRepository.save(realEstate);
    } catch (error) {
      throw new ConflictException(error.driverError.detail);
    }
    return realEstate;
  }

}
