import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpStatus } from '@nestjs/common';
import { HomeStandingService } from './home-standing.service';
import { AddHomeStandingDto } from './dto/add-home-standing.dto';
import { UpdateHomeStandingDto } from './dto/update-home-standing.dto';
import { JwtAuthGuard } from 'src/resources/account/auth/auth.guard';
import { ReferencePipe } from 'src/pipes/reference/reference.pipe';
import { MhouseResponseInterface } from 'src/interfaces/mhouse-response.interface';

@Controller('home-standing')
export class HomeStandingController {
  constructor(private readonly homeStandingService: HomeStandingService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async addHomeStanding(
    @Body(ReferencePipe) addHomeStandingDto: AddHomeStandingDto
    ): Promise<MhouseResponseInterface> {
    const data = await this.homeStandingService.addHomeStanding(addHomeStandingDto);
    return {
      data: data,
      message: "Partage effectué avec succès",
      code: HttpStatus.OK
    }
  }

  @Get(':ref')
  @UseGuards(JwtAuthGuard)
  async showHotelHomeStanding(
    @Param('ref') ref: string
    ): Promise<MhouseResponseInterface> {
    const data = await this.homeStandingService.showHotelHomeStanding(ref);
    return {
      data: data,
      message: "Partage effectué avec succès",
      code: HttpStatus.OK
    }
  }

  @Patch(':ref')
  @UseGuards(JwtAuthGuard)
  async updateHomeStanding(
    @Param('ref') ref: string, 
    @Body() updateHomeStandingDto: UpdateHomeStandingDto
    ): Promise<MhouseResponseInterface> {
    const data = await this.homeStandingService.updateHomeStanding(ref, updateHomeStandingDto);
    return {
      data: data,
      message: "Partage effectué avec succès",
      code: HttpStatus.OK
    }
  }

}
