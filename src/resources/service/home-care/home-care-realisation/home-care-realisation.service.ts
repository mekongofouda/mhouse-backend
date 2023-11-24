import { BadRequestException, ConflictException, HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { AddHomeCareRealisationDto } from './dto/add-home-care-realisation.dto';
import { UpdateHomeCareRealisationDto } from './dto/update-home-care-realisation.dto';
import { HomeCareRealisation } from './entities/home-care-realisation.entity';
import { ListHomeCareRealisationDto } from './dto/list-home-care-realisation.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { HomeCare } from '../entities/home-care.entity';
import { Repository } from 'typeorm';
import { AccountEntity } from 'src/resources/account/entities/account.entity';
import { FunctionPrivilegeEnum } from 'src/enums/function.privilege.enum';
import { Utils } from 'src/generics/utils';

@Injectable()
export class HomeCareRealisationService extends Utils {

  constructor(  
    
    @InjectRepository(AccountEntity) 
    private readonly accountRepository: Repository<AccountEntity>,

    @InjectRepository(HomeCare) 
    private readonly homeCareRepository: Repository<HomeCare>,

    @InjectRepository(HomeCareRealisation) 
    private readonly homeCareRealisationRepository: Repository<HomeCareRealisation>,

  ){
    super()
  }

  async addHomeCareRealisation( addHomeCareRealisationDto: AddHomeCareRealisationDto, account: AccountEntity) {

    const userAccount = await this.accountRepository.findOneBy({refAccount: account.refAccount});
    if(userAccount != null) {
      if (this.IsAuthorised(userAccount, FunctionPrivilegeEnum.ADD_DISCUSSION) == false) {
        throw new UnauthorizedException();
      }
    }

    const homeCare = await this.homeCareRepository.findOneBy({refHomeCare: addHomeCareRealisationDto.refHomeCare}); 
    if (homeCare == null) {
      throw new BadRequestException("HomeCare not found");
    }

    const homeCareRealisation = await this.homeCareRealisationRepository.create(addHomeCareRealisationDto); 
    if (homeCareRealisation == null) {
      throw new BadRequestException("HomeCareRealisation not found");
    }
    homeCareRealisation.homeCare = homeCare; 

    try {
      await this.homeCareRealisationRepository.save(homeCareRealisation);
    } catch (error) {
      throw new ConflictException(error.driverError.detail);
    }

    return homeCareRealisation;

  }

  async listHomeCareRealisation(listHomeCareRealisationDto: ListHomeCareRealisationDto, account: any) {

    const userAccount = await this.accountRepository.findOneBy({refAccount: account.refAccount});
    if(userAccount != null) {
      if (this.IsAuthorised(userAccount, FunctionPrivilegeEnum.ADD_DISCUSSION) == false) {
        throw new UnauthorizedException();
      }
    }

    let listHomeCareRealisations: HomeCareRealisation[] = [];
    let homeCareRealisations: HomeCareRealisation[] = [];

    if (listHomeCareRealisationDto.refAccount != undefined) {
      const userAccount = await this.accountRepository.findOneBy({refAccount: listHomeCareRealisationDto.refAccount});
      if (userAccount == null) {
        throw new HttpException("Account not found", HttpStatus.NOT_FOUND);
      } 
      userAccount.services.forEach( service => {
        service.homeCare.homeCareRealisations.forEach( homeCareRealisation => {
          listHomeCareRealisations.push(homeCareRealisation)
        });
      });
    } else if (listHomeCareRealisationDto.all == 1){
      homeCareRealisations = await this.homeCareRealisationRepository.find();
    } else {
      const userAccount = await this.accountRepository.findOneBy({refAccount: account.refAccount});
      if (userAccount == null) {
        throw new HttpException("Account not found", HttpStatus.NOT_FOUND);
      } 
        userAccount.services.forEach( service => {
          service.homeCare.homeCareRealisations.forEach( homeCareRealisation => {
            homeCareRealisations.push(homeCareRealisation)
          });
        });
      }

    if (listHomeCareRealisationDto.refHomeCare != undefined) {
      const homeCare = await this.homeCareRepository.findOneBy({refHomeCare: listHomeCareRealisationDto.refHomeCare});
      if (homeCare == null) {
        throw new HttpException("HomeCare not found", HttpStatus.NOT_FOUND);
      } 
      homeCareRealisations = homeCare.homeCareRealisations;
      listHomeCareRealisations = homeCare.homeCareRealisations;
    } 

    listHomeCareRealisations.filter(homeCare => {

      if (listHomeCareRealisationDto.createdAt != undefined) {
        if (homeCare.createdAt.toDateString() == listHomeCareRealisationDto.createdAt.toDateString()) {
          if (!homeCareRealisations.includes(homeCare)) {
            homeCareRealisations.push(homeCare);
          }
        }
      }      

      if (listHomeCareRealisationDto.updatedAt != undefined) {
        if (homeCare.updatedAt.toDateString() == listHomeCareRealisationDto.updatedAt.toDateString()) {
          if (!homeCareRealisations.includes(homeCare)) {
            homeCareRealisations.push(homeCare);
          }
        }
      }   

    });

    if ((homeCareRealisations.length == 0) 
    && ((listHomeCareRealisationDto.createdAt != undefined)
    ||(listHomeCareRealisationDto.updatedAt != undefined)
    )) {
      throw new HttpException("HomeCareRealisation not found", HttpStatus.NOT_FOUND);
    } else if (homeCareRealisations.length != 0) {
      listHomeCareRealisations = homeCareRealisations;
    }

    return listHomeCareRealisations;

  }

  async showHomeCareRealisationDetail(refHomeCareRealisation: string, account: AccountEntity) {
    
    const userAccount = await this.accountRepository.findOneBy({refAccount: account.refAccount});
    if(userAccount != null) {
      if (this.IsAuthorised(userAccount, FunctionPrivilegeEnum.ADD_DISCUSSION) == false) {
        throw new UnauthorizedException();
      }
    }

    const homeCareRealisation = await this.homeCareRealisationRepository.findOneBy({refHomeCareRealisation});
    if (homeCareRealisation == null) {
      throw new HttpException("HomeCareRealisation not found", HttpStatus.NOT_FOUND)
    }    

    return homeCareRealisation;

  }

  async updateHomeCareRealisation(refHomeCareRealisation: string, updateHomeCareRealisationDto: UpdateHomeCareRealisationDto, account: AccountEntity) {

    const userAccount = await this.accountRepository.findOneBy({refAccount: account.refAccount});
    if(userAccount != null) {
      if (this.IsAuthorised(userAccount, FunctionPrivilegeEnum.ADD_DISCUSSION) == false) {
        throw new UnauthorizedException();
      }
    }

    const homeCareRealisation = await this.homeCareRealisationRepository.findOneBy({refHomeCareRealisation});
    if (homeCareRealisation == null) {
      throw new HttpException("HomeCareRealisation not found", HttpStatus.NOT_FOUND)
    }    
    Object.assign(homeCareRealisation, updateHomeCareRealisationDto);

    try {
      await this.homeCareRealisationRepository.save(homeCareRealisation);
    } catch (error) {
      throw new ConflictException(error.driverError.detail);
    } 
    return homeCareRealisation;

  }

  async deleteHomeCareRealisation(refHomeCareRealisation: string, account: AccountEntity) {

    const userAccount = await this.accountRepository.findOneBy({refAccount: account.refAccount});
    if(userAccount != null) {
      if (this.IsAuthorised(userAccount, FunctionPrivilegeEnum.ADD_DISCUSSION) == false) {
        throw new UnauthorizedException();
      }
    }

    const homeCareRealisation = await this.homeCareRealisationRepository.findOneBy({refHomeCareRealisation});
    if (homeCareRealisation == null) {
      throw new HttpException("HomeCareRealisation not found", HttpStatus.NOT_FOUND)
    }   

    try {
      await this.homeCareRealisationRepository.softRemove(homeCareRealisation);
    } catch (error) {
      throw new ConflictException(error.driverError.detail);
    } 
    return homeCareRealisation;

  }
}
