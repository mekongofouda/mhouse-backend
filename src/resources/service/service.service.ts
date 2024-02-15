import {
  BadRequestException,
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AddServiceDto } from './dto/add-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { Service } from './entities/service.entity';
import { ListServiceDto } from './dto/list-service.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AccountEntity } from 'src/resources/account/entities/account.entity';
import { FunctionPrivilegeEnum } from 'src/enums/function.privilege.enum';
import { Utils } from 'src/generics/utils';
import { NotificationService } from 'src/resources/notification/notification.service';

@Injectable()
export class ServiceService extends Utils {
  constructor(
    @InjectRepository(AccountEntity)
    private readonly accountRepository: Repository<AccountEntity>,

    @InjectRepository(Service)
    private readonly serviceRepository: Repository<Service>,
    private readonly notificationService: NotificationService,

  ) {
    super();
  }

  async addService(addServiceDto: AddServiceDto, account: AccountEntity) {
    const userAccount = await this.accountRepository.findOneBy({
      refAccount: account.refAccount,
    });
    if (userAccount != null) {
      if (
        this.IsAuthorised(userAccount, FunctionPrivilegeEnum.ADD_SERVICE) ==
        false
      ) {
        throw new UnauthorizedException();
      }
    }

    //Get post to add at the service
    const acccount = await this.accountRepository.create(account);
    if (!acccount) {
      throw new HttpException('Account not found', HttpStatus.NOT_FOUND);
    }

    const service = await this.serviceRepository.create(addServiceDto);
    service.account = account;

    try {
      await this.serviceRepository.save(service);
    } catch (error) {
      throw new ConflictException(error.driverError.detail);
    }
    await this.notificationService.sendNotification(account);

    return service;
  }

  async uploadServiceImage(account, file) {
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

  async listService(
    listServiceDto: ListServiceDto,
    account: AccountEntity,
  ): Promise<Service[]> {
    const userAccount = await this.accountRepository.findOneBy({
      refAccount: account.refAccount,
    });
    if (userAccount != null) {
      if (
        this.IsAuthorised(userAccount, FunctionPrivilegeEnum.LIST_SERVICE) ==
        false
      ) {
        throw new UnauthorizedException();
      }
    }

    let listServices: Service[] = [];
    const services: Service[] = [];

    if (listServiceDto.refAccount != undefined) {
      const userAccount = await this.accountRepository.findOneBy({
        refAccount: listServiceDto.refAccount,
      });
      if (userAccount != null) {
        listServices = userAccount.services;
      } else {
        throw new HttpException('Discussion not found', HttpStatus.NOT_FOUND);
      }
    } else if (listServiceDto.all == 1) {
      listServices = await this.serviceRepository.find();
    } else {
      listServices = account.services;
    }

    listServices.filter((role) => {
      if (listServiceDto.createdAt != undefined) {
        if (
          role.createdAt.toDateString() ==
          listServiceDto.createdAt.toDateString()
        ) {
          services.push(role);
        }
      }
      if (listServiceDto.updatedAt != undefined) {
        if (
          role.updatedAt.toDateString() ==
          listServiceDto.updatedAt.toDateString()
        ) {
          services.push(role);
        }
      }
    });

    if (
      services.length == 0 &&
      (listServiceDto.createdAt != undefined ||
        listServiceDto.updatedAt != undefined)
    ) {
      throw new HttpException('Role not found', HttpStatus.NOT_FOUND);
    } else if (services.length != 0) {
      listServices = services;
    }

    return listServices;
  }

  async showServiceDetail(refService: string, account: AccountEntity) {
    const userAccount = await this.accountRepository.findOneBy({
      refAccount: account.refAccount,
    });
    if (userAccount != null) {
      if (
        this.IsAuthorised(userAccount, FunctionPrivilegeEnum.SHOW_SERVICE) ==
        false
      ) {
        throw new UnauthorizedException();
      }
    }

    const service = await this.serviceRepository.findOneBy({ refService });
    if (service == null) {
      throw new HttpException('Service not found', HttpStatus.NOT_FOUND);
    }
    return service;
  }

  async updateService(
    refService: string,
    updateServiceDto: UpdateServiceDto,
    account: AccountEntity,
  ) {
    const userAccount = await this.accountRepository.findOneBy({
      refAccount: account.refAccount,
    });
    if (userAccount != null) {
      if (
        this.IsAuthorised(userAccount, FunctionPrivilegeEnum.UPDATE_SERVICE) ==
        false
      ) {
        throw new UnauthorizedException();
      }
    }

    const service = await this.serviceRepository.findOneBy({ refService });
    if (service == null) {
      throw new HttpException('Service not found', HttpStatus.NOT_FOUND);
    }
    Object.assign(service, updateServiceDto);

    try {
      await this.serviceRepository.save(service);
    } catch (error) {
      throw new ConflictException(error.driverError.detail);
    }
    await this.notificationService.sendNotification(account);

    return service;
  }

  async deleteService(refService: string, account: AccountEntity) {
    const userAccount = await this.accountRepository.findOneBy({
      refAccount: account.refAccount,
    });
    if (userAccount != null) {
      if (
        this.IsAuthorised(userAccount, FunctionPrivilegeEnum.DELETE_SERVICE) ==
        false
      ) {
        throw new UnauthorizedException();
      }
    }

    const service = await this.serviceRepository.findOneBy({ refService });
    if (service == null) {
      throw new HttpException('Service not found', HttpStatus.NOT_FOUND);
    }

    try {
      await this.serviceRepository.softRemove(service);
    } catch (error) {
      throw new ConflictException(error.driverError.detail);
    }
    await this.notificationService.sendNotification(account);

    return service;
  }
}
