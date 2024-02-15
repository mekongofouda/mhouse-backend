import {
  BadRequestException,
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AddHomeServiceDto } from './dto/add-home-service.dto';
import { UpdateHomeServiceDto } from './dto/update-home-service.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { HomeService } from './entities/home-service.entity';
import { Repository } from 'typeorm';
import { Service } from '../entities/service.entity';
import { FunctionPrivilegeEnum } from 'src/enums/function.privilege.enum';
import { AccountEntity } from 'src/resources/account/entities/account.entity';
import { Utils } from 'src/generics/utils';
import { NotificationService } from 'src/resources/notification/notification.service';

@Injectable()
export class HomeServiceService extends Utils {
  constructor(
    @InjectRepository(AccountEntity)
    private readonly accountRepository: Repository<AccountEntity>,

    @InjectRepository(Service)
    private readonly serviceRepository: Repository<Service>,

    @InjectRepository(HomeService)
    private readonly homeServiceRepository: Repository<HomeService>,
    private readonly notificationService: NotificationService,

  ) {
    super();
  }

  async addHomeService(
    addHomeServiceDto: AddHomeServiceDto,
    account: AccountEntity,
  ) {
    const userAccount = await this.accountRepository.findOneBy({
      refAccount: account.refAccount,
    });
    if (userAccount != null) {
      if (
        this.IsAuthorised(
          userAccount,
          FunctionPrivilegeEnum.ADD_HOME_SERVICE,
        ) == false
      ) {
        throw new UnauthorizedException();
      }
    }

    const service = await this.serviceRepository.findOneBy({
      refService: addHomeServiceDto.refService,
    });
    if (service == null) {
      throw new HttpException('Service not found', HttpStatus.NOT_FOUND);
    }

    const homeService =
      await this.homeServiceRepository.create(addHomeServiceDto);
    if (homeService == null) {
      throw new BadRequestException('HomeService not found');
    }
    homeService.service = service;

    try {
      await this.homeServiceRepository.save(homeService);
    } catch (error) {
      throw new ConflictException(error.driverError.detail);
    }

    return homeService;
  }

  async uploadHomeServiceImage(account, file) {
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

  async showHomeServiceDetail(refHomeService: string, account: AccountEntity) {
    const userAccount = await this.accountRepository.findOneBy({
      refAccount: account.refAccount,
    });
    if (userAccount != null) {
      if (
        this.IsAuthorised(
          userAccount,
          FunctionPrivilegeEnum.SHOW_HOME_SERVICE,
        ) == false
      ) {
        throw new UnauthorizedException();
      }
    }

    const homeService = await this.homeServiceRepository.findOneBy({
      refHomeService,
    });
    if (homeService == null) {
      throw new HttpException('Service not found', HttpStatus.NOT_FOUND);
    }

    return homeService;
  }

  async updateHomeService(
    refHomeService: string,
    updateHomeServiceDto: UpdateHomeServiceDto,
    account: AccountEntity,
  ) {
    const userAccount = await this.accountRepository.findOneBy({
      refAccount: account.refAccount,
    });
    if (userAccount != null) {
      if (
        this.IsAuthorised(
          userAccount,
          FunctionPrivilegeEnum.UPDATE_HOME_SERVICE,
        ) == false
      ) {
        throw new UnauthorizedException();
      }
    }

    const homeService = await this.homeServiceRepository.findOneBy({
      refHomeService,
    });
    if (homeService == null) {
      throw new HttpException('Homecare not found', HttpStatus.NOT_FOUND);
    }
    Object.assign(homeService, updateHomeServiceDto);

    try {
      await this.homeServiceRepository.save(homeService);
    } catch (error) {
      throw new ConflictException(error.driverError.detail);
    }
    await this.notificationService.sendNotification(account);

    return homeService;
  }
}
