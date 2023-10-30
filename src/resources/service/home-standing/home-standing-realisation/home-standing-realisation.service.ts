import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { AddHomeStandingRealisationDto } from './dto/add-home-standing-realisation.dto';
import { UpdateHomeStandingRealisationDto } from './dto/update-home-standing-realisation.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { HomeStanding } from '../entities/home-standing.entity';
import { Repository } from 'typeorm';
import { HomeStandingRealisation } from '../home-standing-realisation/entities/home-standing-realisation.entity';

@Injectable()
export class HomeStandingRealisationService {

  constructor(  
    @InjectRepository(HomeStanding) 
    private readonly homeStandingRepository: Repository<HomeStanding>,

    @InjectRepository(HomeStandingRealisation) 
    private readonly homeStandingRealisationRepository: Repository<HomeStandingRealisation>,

  ){}
 
  async addHomeStandingRealisation(addHomeStandingRealisationDto: AddHomeStandingRealisationDto) {
    //Create the service object with Dto to save it 
    const homeStanding = await this.homeStandingRepository.create(addHomeStandingRealisationDto); 
    if (homeStanding == null) {
      throw new BadRequestException("Service not found");
    }

    //Create the homeCare object with Dto to save it 
    const homeStandingRealisation = await this.homeStandingRealisationRepository.create(addHomeStandingRealisationDto); 
    if (homeStandingRealisation == null) {
      throw new BadRequestException("Service not found");
    }
    homeStandingRealisation.homeStanding = homeStanding; 
    try {
      await this.homeStandingRepository.save(homeStandingRealisation);
    } catch (error) {
      throw new ConflictException(error.driverError.detail);
    }
    return homeStandingRealisation;
  }

  async listHomeStandingRealisation() {
    return `This action returns all homeStandingRealisation`;
  }

  async showHomeStandingRealisationDetail(refHomeStandingRealisation: string) {
    return `This action returns a #${refHomeStandingRealisation} homeStandingRealisation`;
  }

  async updateHomeStandingRealisation(refHomeStandingRealisation: string, updateHomeStandingRealisationDto: UpdateHomeStandingRealisationDto) {
    return `This action updates a #${refHomeStandingRealisation} homeStandingRealisation`;
  }

  async deleteHomeStandingRealisation(refHomeStandingRealisation: string) {
    return `This action removes a #${refHomeStandingRealisation} homeStandingRealisation`;
  }
}
