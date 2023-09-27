import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AddServiceDto } from './dto/add-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { Service } from './entities/service.entity';
import { ListServiceDto } from './dto/list-service.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ServiceService {

  constructor(
    @InjectRepository(Service) 
    private readonly serviceRepository: Repository<Service>
  ){}

  async addService(addServiceDto: AddServiceDto) {
    return await this.serviceRepository.save(addServiceDto);
  }

  async listService(listServiceto: ListServiceDto): Promise<Service[]> {
    const refUser = listServiceto.refUser;
    const createdAt = listServiceto.createdAt;
    const updatedAt = listServiceto.updatedAt;

    const qb = this.serviceRepository.createQueryBuilder("service");

    qb.select("service")
    if (refUser) {
      qb.where("service.refUser = :refUser")
      .setParameters({
        refUser
      })
    }
    if (createdAt) {
      qb.where("service.createdAt = :createdAt")
      .setParameters({
        createdAt
      })
    }
    if (updatedAt) {
      qb.where("service.updatedAt = :updatedAt")
      .setParameters({
        updatedAt
      })
    }
    return await qb.getRawMany();
  }

  async showServiceDetail(refService: string) {
    const service = await this.serviceRepository.findOne({where:{refService}});
    console.log(service);
    if (service == null) {
      throw new HttpException("Service not found", HttpStatus.NOT_FOUND)
    }    
    return service;
  }

  async updateService(refService: string, updateServiceDto: UpdateServiceDto) {
    const service = await this.serviceRepository.findOne({where:{refService}});
    if (service == null) {
      throw new HttpException("Service not found", HttpStatus.NOT_FOUND)
    }    
    Object.assign(service, updateServiceDto);
    return await this.serviceRepository.save(service);
  }

  async deleteService(refService: string) {
    const service = await this.serviceRepository.findOneBy({refService});
    if (service == null) {
      throw new HttpException("Service not found", HttpStatus.NOT_FOUND)
    }    
    return await this.serviceRepository.softRemove(service);
  }
}
