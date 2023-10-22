import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, HttpStatus } from '@nestjs/common';
import { ServiceService } from './service.service';
import { AddServiceDto } from './dto/add-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { ReferencePipe } from 'src/pipes/reference/reference.pipe';
import { ListServiceDto } from './dto/list-service.dto';
import { Service } from './entities/service.entity';
import { JwtAuthGuard } from 'src/resources/account/auth/auth.guard';
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
      code: HttpStatus.OK
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
      code: HttpStatus.OK
    };
  }

  @Patch(':ref')
  @UseGuards(JwtAuthGuard)
  async updateService(
    @Param('ref') ref: string, 
    @Body() updateServiceDto: UpdateServiceDto
  ): Promise<MhouseResponseInterface> {
    const data = await this.serviceService.updateService(ref, updateServiceDto);
    return {
      data: data,
      message: "Partage effectué avec succès",
      code: HttpStatus.OK
    };
  }

  @Delete(':ref')
  async deleteService(
    @Param('ref') ref: string
    ): Promise<MhouseResponseInterface> {
    const data = await this.serviceService.deleteService(ref);
    return {
      data: data,
      message: "Service supprimé avec succès",
      code: HttpStatus.OK
    };
  }
}
