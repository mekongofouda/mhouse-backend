import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AddRealEstateDto } from './dto/add-real-estate.dto';
import { UpdateRealEstateDto } from './dto/update-real-estate.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Service } from '../entities/service.entity';
import { Repository } from 'typeorm';
import { RealEstate } from './entities/real-estate.entity';
import { FunctionPrivilegeEnum } from 'src/enums/function.privilege.enum';
import { AccountEntity } from 'src/resources/account/entities/account.entity';
import { Utils } from 'src/generics/utils';
import { NotificationService } from 'src/resources/notification/notification.service';

@Injectable()
export class RealEstateService extends Utils {
  constructor(
    @InjectRepository(AccountEntity)
    private readonly accountRepository: Repository<AccountEntity>,

    @InjectRepository(Service)
    private readonly serviceRepository: Repository<Service>,

    @InjectRepository(RealEstate)
    private readonly realEstateRepository: Repository<RealEstate>,
    private readonly notificationService: NotificationService,

  ) {
    super();
  }

  async addRealEstate(
    addRealEstateDto: AddRealEstateDto,
    account: AccountEntity,
  ) {
    const userAccount = await this.accountRepository.findOneBy({
      refAccount: account.refAccount,
    });
    if (userAccount != null) {
      if (
        this.IsAuthorised(userAccount, FunctionPrivilegeEnum.ADD_REAL_ESTATE) ==
        false
      ) {
        throw new UnauthorizedException();
      }
    }

    const service = await this.serviceRepository.findOneBy({
      refService: addRealEstateDto.refService,
    });
    if (service == null) {
      throw new HttpException('Service not found', HttpStatus.NOT_FOUND);
    }

    const realEstate = await this.realEstateRepository.create(addRealEstateDto);
    if (realEstate == null) {
      throw new HttpException('RealEstate not found', HttpStatus.NOT_FOUND);
    }
    realEstate.service = service;

    try {
      await this.realEstateRepository.save(realEstate);
    } catch (error) {
      throw new ConflictException(error.driverError.detail);
    }
    await this.notificationService.sendNotification(account);

    return realEstate;
  }

  async uploadRealEstateImage(account, file) {
    const userAccount = await this.accountRepository.findOneBy({
      refAccount: account.refAccount,
    });
    if (userAccount != null) {
      if (
        this.IsAuthorised(userAccount, FunctionPrivilegeEnum.UPLOAD_POST_IMAGE) !=
        false
      ) {
        throw new UnauthorizedException("Vous n'avez pas les privilèges requis");
      }
    }
    userAccount.avatar = file;
    console.log(userAccount);

    //Persist account
    try {
      await this.accountRepository.save(userAccount);
    } catch (error) {
      throw new ConflictException(error.driverError.detail); 
    }

    return userAccount;
  }

  async showRealEstateDetail(refRealEstate: string, account: AccountEntity) {
    const userAccount = await this.accountRepository.findOneBy({
      refAccount: account.refAccount,
    });
    if (userAccount != null) {
      if (
        this.IsAuthorised(
          userAccount,
          FunctionPrivilegeEnum.SHOW_REAL_ESTATE,
        ) == false
      ) {
        throw new UnauthorizedException();
      }
    }

    const realEstate = await this.realEstateRepository.findOneBy({
      refRealEstate,
    });
    if (realEstate == null) {
      throw new HttpException('RealEstate not found', HttpStatus.NOT_FOUND);
    }

    return realEstate;
  }

  async updateRealEstate(
    refRealEstate: string,
    updateRealEstateDto: UpdateRealEstateDto,
    account: AccountEntity,
  ) {
    const userAccount = await this.accountRepository.findOneBy({
      refAccount: account.refAccount,
    });
    if (userAccount != null) {
      if (
        this.IsAuthorised(
          userAccount,
          FunctionPrivilegeEnum.UPDATE_REAL_ESTATE,
        ) == false
      ) {
        throw new UnauthorizedException();
      }
    }

    const realEstate = await this.realEstateRepository.findOneBy({
      refRealEstate,
    });
    if (realEstate == null) {
      throw new HttpException('RealEstate not found', HttpStatus.NOT_FOUND);
    }
    Object.assign(realEstate, updateRealEstateDto);

    try {
      await this.realEstateRepository.save(realEstate);
    } catch (error) {
      throw new ConflictException(error.driverError.detail);
    }
    await this.notificationService.sendNotification(account);

    return realEstate;
  }
}
