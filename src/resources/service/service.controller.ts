import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { ServiceService } from './service.service';
import { AddServiceDto } from './dto/add-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { ReferencePipe } from 'src/pipes/reference/reference.pipe';
import { ListServiceDto } from './dto/list-service.dto';
import { Service } from './entities/service.entity';
import { JwtAuthGuard } from 'src/resources/auth/auth.guard';
import { Account } from 'src/decorators/account.decorator';
import { MhouseResponseInterface } from 'src/interfaces/mhouse-response.interface';

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
    ): Promise<MhouseResponseInterface> {
    const data = await this.serviceService.addService(addServiceDto, user);
    return {
      data: data,
      message: "Partage effectué avec succès",
      code:"200"
    }
    
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async listService(
    @Query() listServiceDto: ListServiceDto,
    @Account() account
  ): Promise<Service[]> {
    return await this.serviceService.listService(listServiceDto, account);
  }

  @Get(':ref')
  @UseGuards(JwtAuthGuard)
  async showServiceDetail(
    @Param('ref') ref: string
    ): Promise<MhouseResponseInterface> {
    const data = await this.serviceService.showServiceDetail(ref);
    return {
      data: data,
      message: "Partage effectué avec succès",
      code:"200"
    };
  }

  // @Patch(':ref')
  // @UseGuards(JwtAuthGuard)
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
