import { BadRequestException, ConflictException, HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { AddHomeCareDto } from './dto/add-home-care.dto';
import { UpdateHomeCareDto } from './dto/update-home-care.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { HomeCare } from './entities/home-care.entity';
import { Repository } from 'typeorm';
import { Service } from '../entities/service.entity';
import { FunctionPrivilegeEnum } from 'src/enums/function.privilege.enum';
import { AccountEntity } from 'src/resources/account/entities/account.entity';
import { Utils } from 'src/generics/utils';

@Injectable()
export class HomeCareService extends Utils {

  constructor(  

    @InjectRepository(AccountEntity) 
    private readonly accountRepository: Repository<AccountEntity>,

    @InjectRepository(Service) 
    private readonly serviceRepository: Repository<Service>,

    @InjectRepository(HomeCare) 
    private readonly homeCareRepository: Repository<HomeCare>

  ){
    super()
  }

  async addHomeCare(addHomeCareDto: AddHomeCareDto, account: AccountEntity) {

    const userAccount = await this.accountRepository.findOneBy({refAccount: account.refAccount});
    if(userAccount != null) {
      if (this.IsAuthorised(userAccount, FunctionPrivilegeEnum.ADD_DISCUSSION) == false) {
        throw new UnauthorizedException();
      }
    }

    let service = await this.serviceRepository.findOneBy({refService: addHomeCareDto.refService}); 
    if (service == null) {
      throw new HttpException("Service not found", HttpStatus.NOT_FOUND);
    }

    let homeCare = await this.homeCareRepository.create(addHomeCareDto); 
    if (homeCare == null) {
      throw new BadRequestException("HomeCare not found");
    }
    homeCare.service = service; 

    try {
      await this.homeCareRepository.save(homeCare);
    } catch (error) {
      throw new ConflictException(error.driverError.detail);
    }

    return homeCare;

  }

  async showHomCareDetail(refHomeCare: string, account: AccountEntity) {

    const userAccount = await this.accountRepository.findOneBy({refAccount: account.refAccount});
    if(userAccount != null) {
      if (this.IsAuthorised(userAccount, FunctionPrivilegeEnum.ADD_DISCUSSION) == false) {
        throw new UnauthorizedException();
      }
    }

    const homeCare = await this.homeCareRepository.findOneBy({refHomeCare});
    if (homeCare == null) {
      throw new HttpException("Service not found", HttpStatus.NOT_FOUND)
    }    

    return homeCare;

  }

  async updateHomCare(refHomeCare: string, updateHomeCareDto: UpdateHomeCareDto, account: AccountEntity) {

    const userAccount = await this.accountRepository.findOneBy({refAccount: account.refAccount});
    if(userAccount != null) {
      if (this.IsAuthorised(userAccount, FunctionPrivilegeEnum.ADD_DISCUSSION) == false) {
        throw new UnauthorizedException();
      }
    }

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
