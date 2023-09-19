import { Injectable } from '@nestjs/common';
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

  addService(addServiceDto: AddServiceDto) {
    return 'This action adds a new service';
  }

  async listService(listServiceto: ListServiceDto): Promise<Service[]> {
    return await this.serviceRepository.find();
  }

  showServiceDetail(refService: string) {
    return `This action returns a #${refService} service`;
  }

  updateService(refService: string, updateServiceDto: UpdateServiceDto) {
    return `This action updates a #${refService} service`;
  }

  deleteService(refService: string) {
    return `This action removes a #${refService} service`;
  }
}
