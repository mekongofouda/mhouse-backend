import { BadRequestException, ConflictException, HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { AddHomeStandingRealisationDto } from './dto/add-home-standing-realisation.dto';
import { UpdateHomeStandingRealisationDto } from './dto/update-home-standing-realisation.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { HomeStanding } from '../entities/home-standing.entity';
import { Repository } from 'typeorm';
import { HomeStandingRealisation } from '../home-standing-realisation/entities/home-standing-realisation.entity';
import { AccountEntity } from 'src/resources/account/entities/account.entity';
import { ListHomeStandingRealisationDto } from './dto/list-home-standing-realisation.dto';
import { FunctionPrivilegeEnum } from 'src/enums/function.privilege.enum';
import { Utils } from 'src/generics/utils';

@Injectable()
export class HomeStandingRealisationService extends Utils {

  constructor(  

    @InjectRepository(AccountEntity) 
    private readonly accountRepository: Repository<AccountEntity>,

    @InjectRepository(HomeStanding) 
    private readonly homeStandingRepository: Repository<HomeStanding>,

    @InjectRepository(HomeStandingRealisation) 
    private readonly homeStandingRealisationRepository: Repository<HomeStandingRealisation>,

  ){
    super()
  }
 
  async addHomeStandingRealisation(addHomeStandingRealisationDto: AddHomeStandingRealisationDto, account: AccountEntity) {

    const userAccount = await this.accountRepository.findOneBy({refAccount: account.refAccount});
    if(userAccount != null) {
      if (this.IsAuthorised(userAccount, FunctionPrivilegeEnum.ADD_DISCUSSION) == false) {
        throw new UnauthorizedException();
      }
    }

    const homeStanding = await this.homeStandingRepository.findOneBy({refHomeStanding: addHomeStandingRealisationDto.refHomeStanding}); 
    if (homeStanding == null) {
      throw new BadRequestException("HomeStanding not found");
    }

    const homeStandingRealisation = await this.homeStandingRealisationRepository.create(addHomeStandingRealisationDto); 
    if (homeStandingRealisation == null) {
      throw new BadRequestException("HomeStandingRealisation not found");
    }
    homeStandingRealisation.homeStanding = homeStanding; 

    try {
      await this.homeStandingRealisationRepository.save(homeStandingRealisation);
    } catch (error) {
      throw new ConflictException(error.driverError.detail);
    }

    return homeStandingRealisation;

  }

  async listHomeStandingRealisation(listHomeStandingRealisationDto: ListHomeStandingRealisationDto, account: any) {

    const userAccount = await this.accountRepository.findOneBy({refAccount: account.refAccount});
    if(userAccount != null) {
      if (this.IsAuthorised(userAccount, FunctionPrivilegeEnum.ADD_DISCUSSION) == false) {
        throw new UnauthorizedException();
      }
    }

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
        throw new HttpException("HomeStanding not found", HttpStatus.NOT_FOUND);
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
      throw new HttpException("HomeStandingRealisation not found", HttpStatus.NOT_FOUND);
    } else if (homeStandingRealisations.length != 0) {
      listHomeStandingRealisations = homeStandingRealisations;
    }

    return listHomeStandingRealisations;

  }

  async showHomeStandingRealisationDetail(refHomeStandingRealisation: string, account: AccountEntity) {

    const userAccount = await this.accountRepository.findOneBy({refAccount: account.refAccount});
    if(userAccount != null) {
      if (this.IsAuthorised(userAccount, FunctionPrivilegeEnum.ADD_DISCUSSION) == false) {
        throw new UnauthorizedException();
      }
    }

    const homeStandingRealisation = await this.homeStandingRealisationRepository.findOneBy({refHomeStandingRealisation});
    if (homeStandingRealisation == null) {
      throw new HttpException("HomeStandingRealisation not found", HttpStatus.NOT_FOUND)
    }  

    return homeStandingRealisation;

  }

  async updateHomeStandingRealisation(refHomeStandingRealisation: string, updateHomeStandingRealisationDto: UpdateHomeStandingRealisationDto, account: AccountEntity) {

    const userAccount = await this.accountRepository.findOneBy({refAccount: account.refAccount});
    if(userAccount != null) {
      if (this.IsAuthorised(userAccount, FunctionPrivilegeEnum.ADD_DISCUSSION) == false) {
        throw new UnauthorizedException();
      }
    }

    const homeStandingRealisation = await this.homeStandingRealisationRepository.findOne({where:{refHomeStandingRealisation}});
    if (homeStandingRealisation == null) {
      throw new HttpException("HomeStandingRealisation not found", HttpStatus.NOT_FOUND)
    }    
    Object.assign(homeStandingRealisation, updateHomeStandingRealisationDto);

    try {
      await this.homeStandingRealisationRepository.save(homeStandingRealisation);
    } catch (error) {
      throw new ConflictException(error.driverError.detail);
    } 

    return homeStandingRealisation;

  }

  async deleteHomeStandingRealisation(refHomeStandingRealisation: string, account: AccountEntity) {

    const userAccount = await this.accountRepository.findOneBy({refAccount: account.refAccount});
    if(userAccount != null) {
      if (this.IsAuthorised(userAccount, FunctionPrivilegeEnum.ADD_DISCUSSION) == false) {
        throw new UnauthorizedException();
      }
    }

    const homeStandingRealisation = await this.homeStandingRealisationRepository.findOneBy({refHomeStandingRealisation});
    if (homeStandingRealisation == null) {
      throw new HttpException("HomeStandingRealisation not found", HttpStatus.NOT_FOUND)
    }   

    try {
      await this.homeStandingRealisationRepository.softRemove(homeStandingRealisation);
    } catch (error) {
      throw new ConflictException(error.driverError.detail);
    } 

    return homeStandingRealisation;

  }
}
