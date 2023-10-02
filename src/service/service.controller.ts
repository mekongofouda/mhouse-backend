import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { ServiceService } from './service.service';
import { AddServiceDto } from './dto/add-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { ReferencePipe } from 'src/pipes/reference/reference.pipe';
import { ListServiceDto } from './dto/list-service.dto';
import { Service } from './entities/service.entity';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { Account } from 'src/decorators/account.decorator';

@Controller('service')
export class ServiceController {

  constructor(
    private readonly serviceService: ServiceService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async addService(
    @Body(ReferencePipe) addServiceDto: AddServiceDto,
    @Account() user
    ): Promise<Service> {
    return await this.serviceService.addService(addServiceDto, user);
  }

  // @Get()
  // async listService(
  //   @Query() listServiceDto: ListServiceDto,
  //   @Account() user
  // ): Promise<Service[]> {
  //   return await this.serviceService.listService(listServiceDto, user);
  // }

  // @Get(':ref')
  // async showServiceDetail(
  //   @Param('ref') ref: string
  //   ): Promise<Service> {
  //   return await this.serviceService.showServiceDetail(ref);
  // }

  // @Patch(':ref')
  // async updateService(
  //   @Param('ref') ref: string, 
  //   @Body() updateServiceDto: UpdateServiceDto
  // ): Promise<Service> {
  //   return await this.serviceService.updateService(ref, updateServiceDto);
  // }

  // @Delete(':ref')
  // async deleteService(
  //   @Param('ref') ref: string
  //   ): Promise<Service> {
  //   return await this.serviceService.deleteService(ref);
  // }
}
