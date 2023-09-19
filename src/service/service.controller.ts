import { Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpException, HttpStatus } from '@nestjs/common';
import { ServiceService } from './service.service';
import { AddServiceDto } from './dto/add-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { ReferencePipe } from 'src/pipes/reference/reference.pipe';
import { ListServiceDto } from './dto/list-service.dto';
import { DatePipe } from 'src/pipes/date/date.pipe';

@Controller('service')
export class ServiceController {

  constructor(
    private readonly serviceService: ServiceService,
  ) {}

  @Post()
  addService(
    @Body(ReferencePipe, DatePipe) addServiceDto: AddServiceDto
    ) {
    return this.serviceService.addService(addServiceDto);
  }

  @Get()
  listService(
    @Query() listServiceDto: ListServiceDto
  ) {
    if (!this.serviceService.listService(listServiceDto)) {
      throw new HttpException("Service not found", HttpStatus.NOT_FOUND)
    }
    return this.serviceService.listService(listServiceDto);
  }

  @Get(':ref')
  showServiceDetail(
    @Param('ref') ref: string
    ) {
    if (!this.serviceService.showServiceDetail(ref)) {
      throw new HttpException("Service not found", HttpStatus.NOT_FOUND)
    }
    return this.serviceService.showServiceDetail(ref);
  }

  @Patch(':ref')
  updateService(
    @Param('ref') ref: string, 
    @Body() updateServiceDto: UpdateServiceDto
  ) {
    return this.serviceService.updateService(ref, updateServiceDto);
  }

  @Delete(':ref')
  deleteService(
    @Param('ref') ref: string
    ) {
    return this.serviceService.deleteService(ref);
  }
}
