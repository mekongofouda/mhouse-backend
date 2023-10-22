import { Controller, Get, Post, Body, Patch, Param, HttpStatus, UseGuards } from '@nestjs/common';
import { HomeCareService } from './home-care.service';
import { AddHomeCareDto } from './dto/add-home-care.dto';
import { UpdateHomeCareDto } from './dto/update-home-care.dto';
import { MhouseResponseInterface } from 'src/interfaces/mhouse-response.interface';
import { JwtAuthGuard } from 'src/resources/account/auth/auth.guard';

@Controller('home-care')
export class HomeCareController {
  constructor(private readonly homeCareService: HomeCareService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async addHomeCare(
    @Body() createHomeCareDto: AddHomeCareDto
    ): Promise<MhouseResponseInterface> {
    const data = await this.homeCareService.addHomeCare(createHomeCareDto);
    return {
      data: data,
      message: "Partage effectué avec succès",
      code: HttpStatus.OK
    }
  }

  @Get(':ref')
  @UseGuards(JwtAuthGuard)
  async showHomCareDetail(
    @Param('ref') ref: string
    ): Promise<MhouseResponseInterface> {
    const data = await this.homeCareService.showHomCareDetail(ref);
    return {
      data: data,
      message: "Partage effectué avec succès",
      code: HttpStatus.OK
    }
  }

  @Patch(':ref')
  @UseGuards(JwtAuthGuard)
  async updateHomCare(
    @Param('ref') ref: string, 
    @Body() updateHomeCareDto: UpdateHomeCareDto
    ): Promise<MhouseResponseInterface> {
    const data = await this.homeCareService.updateHomCare(ref, updateHomeCareDto);
    return {
      data: data,
      message: "Partage effectué avec succès",
      code: HttpStatus.OK
    }
  }

}
