import { BadRequestException, ConflictException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AddHomeStandingRealisationDto } from './dto/add-home-standing-realisation.dto';
import { UpdateHomeStandingRealisationDto } from './dto/update-home-standing-realisation.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { HomeStanding } from '../entities/home-standing.entity';
import { Repository } from 'typeorm';
import { HomeStandingRealisation } from '../home-standing-realisation/entities/home-standing-realisation.entity';
import { AccountEntity } from 'src/resources/account/entities/account.entity';
import { ListHomeStandingRealisationDto } from './dto/list-home-standing-realisation.dto';

@Injectable()
export class HomeStandingRealisationService {

  constructor(  
    @InjectRepository(AccountEntity) 
    private readonly accountRepository: Repository<AccountEntity>,

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

  async listHomeStandingRealisation(listHomeStandingRealisationDto: ListHomeStandingRealisationDto, account: any) {
    let listHomeStandingRealisations: HomeStandingRealisation[] = [];
    let homeStandingRealisations: HomeStandingRealisation[] = [];

    if (listHomeStandingRealisationDto.refAccount != undefined) {
      const userAccount = await this.accountRepository.findOneBy({refAccount: listHomeStandingRealisationDto.refAccount});
      if (userAccount == null) {
        throw new HttpException("Account not found", HttpStatus.NOT_FOUND);
      } 
      userAccount.services.forEach( service => {
        service.homeStanding.homeStandingRealisations.forEach( homeStandingRealisation => {
          listHomeStandingRealisations.push(homeStandingRealisation)
        });
      });
    } else if (listHomeStandingRealisationDto.all == 1){
      listHomeStandingRealisations = await this.homeStandingRealisationRepository.find();
    } else {
      const userAccount = await this.accountRepository.findOneBy({refAccount: account.refAccount});
      if (userAccount == null) {
        throw new HttpException("Account not found", HttpStatus.NOT_FOUND);
      } 
        userAccount.services.forEach( service => {
          service.homeStanding.homeStandingRealisations.forEach( homeStandingRealisation => {
            listHomeStandingRealisations.push(homeStandingRealisation)
          });
        });
      }

    if (listHomeStandingRealisationDto.refHomeStanding != undefined) {
      const homeStanding = await this.homeStandingRepository.findOneBy({refHomeStanding: listHomeStandingRealisationDto.refHomeStanding});
      if (homeStanding == null) {
        throw new HttpException("Post not found", HttpStatus.NOT_FOUND);
      } 
      homeStandingRealisations = homeStanding.homeStandingRealisations;
      listHomeStandingRealisations = homeStanding.homeStandingRealisations;
    } 
    listHomeStandingRealisations.filter(homeStanding => {
      if (listHomeStandingRealisationDto.createdAt != undefined) {
        if (homeStanding.createdAt.toDateString() == listHomeStandingRealisationDto.createdAt.toDateString()) {
          if (!homeStandingRealisations.includes(homeStanding)) {
            homeStandingRealisations.push(homeStanding);
          }
        }
      }      
      if (listHomeStandingRealisationDto.updatedAt != undefined) {
        if (homeStanding.updatedAt.toDateString() == listHomeStandingRealisationDto.updatedAt.toDateString()) {
          if (!homeStandingRealisations.includes(homeStanding)) {
            homeStandingRealisations.push(homeStanding);
          }
        }
      }   
    });

    if ((homeStandingRealisations.length == 0) 
    && ((listHomeStandingRealisationDto.createdAt != undefined)
    ||(listHomeStandingRealisationDto.updatedAt != undefined)
    )) {
      throw new HttpException("Like not found", HttpStatus.NOT_FOUND);
    } else if (homeStandingRealisations.length != 0) {
      listHomeStandingRealisations = homeStandingRealisations;
    }
    return listHomeStandingRealisations;
  }

  async showHomeStandingRealisationDetail(refHomeStandingRealisation: string) {
    const homeStandingRealisation = await this.homeStandingRealisationRepository.findOneBy({refHomeStandingRealisation});
    if (homeStandingRealisation == null) {
      throw new HttpException("Like not found", HttpStatus.NOT_FOUND)
    }    
    return homeStandingRealisation;
  }

  async updateHomeStandingRealisation(refHomeStandingRealisation: string, updateHomeStandingRealisationDto: UpdateHomeStandingRealisationDto) {
    const homeStandingRealisation = await this.homeStandingRealisationRepository.findOne({where:{refHomeStandingRealisation}});
    if (homeStandingRealisation == null) {
      throw new HttpException("Offer not found", HttpStatus.NOT_FOUND)
    }    
    Object.assign(homeStandingRealisation, updateHomeStandingRealisationDto);
    try {
      await this.homeStandingRealisationRepository.save(homeStandingRealisation);
    } catch (error) {
      throw new ConflictException(error.driverError.detail);
    } 
    return homeStandingRealisation;
  }

  async deleteHomeStandingRealisation(refHomeStandingRealisation: string) {
    const homeStandingRealisation = await this.homeStandingRealisationRepository.findOneBy({refHomeStandingRealisation});
    if (homeStandingRealisation == null) {
      throw new HttpException("Offer not found", HttpStatus.NOT_FOUND)
    }   
    try {
      await this.homeStandingRealisationRepository.softRemove(homeStandingRealisation);
    } catch (error) {
      throw new ConflictException(error.driverError.detail);
    } 
    return homeStandingRealisation;
  }
}
