import { BadRequestException, ConflictException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AddServiceDto } from './dto/add-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { Service } from './entities/service.entity';
import { ListServiceDto } from './dto/list-service.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AccountEntity } from 'src/resources/account/entities/account.entity';

@Injectable()
export class ServiceService {

  constructor(
    @InjectRepository(AccountEntity) 
    private readonly accountRepository: Repository<AccountEntity>,

    @InjectRepository(Service) 
    private readonly serviceRepository: Repository<Service>
  ){}

  async addService(addServiceDto: AddServiceDto, account: AccountEntity) {
    //Get post to add at the service
    const acccount = await this.accountRepository.create(account);
    if (!acccount) {
      throw new HttpException("Share not found", HttpStatus.NOT_FOUND)
    }

    //Create the service object with Dto to save it 
    const service = await this.serviceRepository.create(addServiceDto); 
    if (!service) {
      throw new BadRequestException("Hare not found");
    }

    //Set properties
    service.account = account;

    try {
      await this.serviceRepository.save(service);
    } catch (error) {
      throw new ConflictException(error.driverError.detail);
    }
    return service;
  }

  async listService(listServiceto: ListServiceDto, account: AccountEntity): Promise<Service[]> {
    
    const userAccount = await this.accountRepository.create(account);
    let listServices: Service[] = [];
    if (userAccount == null) {
      throw new HttpException("Account not found", HttpStatus.NOT_FOUND);
    }
    listServices = userAccount.services;
    return await listServices;

  }

  async showServiceDetail(refService: string) {
    const service = await this.serviceRepository.findOne({where:{refService}});
    if (!service) {
      throw new HttpException("Service not found", HttpStatus.NOT_FOUND)
    }    
    return service;
  }

  // async updateService(refService: string, updateServiceDto: UpdateServiceDto) {
  //   const service = await this.serviceRepository.findOne({where:{refService}});
  //   if (service == null) {
  //     throw new HttpException("Service not found", HttpStatus.NOT_FOUND)
  //   }    
  //   Object.assign(service, updateServiceDto);
  //   return await this.serviceRepository.save(service);
  // }

  // async deleteService(refService: string) {
  //   const service = await this.serviceRepository.findOneBy({refService});
  //   if (service == null) {
  //     throw new HttpException("Service not found", HttpStatus.NOT_FOUND)
  //   }    
  //   return await this.serviceRepository.softRemove(service);
  // }
}
