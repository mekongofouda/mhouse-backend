import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, HttpStatus } from '@nestjs/common';
import { HomeCareRealisationService } from './home-care-realisation.service';
import { AddHomeCareRealisationDto } from './dto/add-home-care-realisation.dto';
import { UpdateHomeCareRealisationDto } from './dto/update-home-care-realisation.dto';
import { MhouseResponseInterface } from 'src/interfaces/mhouse-response.interface';
import { Account } from 'src/decorators/account.decorator';
import { ListHomeCareRealisationDto } from './dto/list-home-care-realisation.dto';
import { JwtAuthGuard } from 'src/resources/account/auth/auth.guard';

@Controller('home-care-realisation')
export class HomeCareRealisationController {
  constructor(private readonly homeCareRealisationService: HomeCareRealisationService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async addHomeCareRealisation(
    @Body() addHomeCareRealisationDto: AddHomeCareRealisationDto
    ): Promise<MhouseResponseInterface> {
    const data = await this.homeCareRealisationService.addHomeCareRealisation(addHomeCareRealisationDto);
    return {
      data: data,
      message: "Partage effectué avec succès",
      code: HttpStatus.OK
    };
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async listHomeCareRealisation(
    @Query() listHomeHomeCareDto: ListHomeCareRealisationDto,
    @Account() account
  ): Promise<MhouseResponseInterface> {
    const data = await this.homeCareRealisationService.listHomeCareRealisation(listHomeHomeCareDto, account);
    return {
      data: data,
      message: "Partage effectué avec succès",
      code: HttpStatus.OK
    };
  }

  @Get(':ref')
  @UseGuards(JwtAuthGuard)
  async showHomeCareRealisationDetail(
    @Param('ref') ref: string
    ): Promise<MhouseResponseInterface> {
    const data = await this.homeCareRealisationService.showHomeCareRealisationDetail(ref);
    return {
      data: data,
      message: "Partage effectué avec succès",
      code: HttpStatus.OK
    };
  }

  @Patch(':ref')
  @UseGuards(JwtAuthGuard)
  async updateHomCareRealisation(
    @Param('ref') ref: string, 
    @Body() updateHomeCareRealisationDto: UpdateHomeCareRealisationDto
    ): Promise<MhouseResponseInterface> {
    const data = await this.homeCareRealisationService.updateHomeCareRealisation(ref, updateHomeCareRealisationDto);
    return {
      data: data,
      message: "Partage effectué avec succès",
      code: HttpStatus.OK
    };
  }

  @Delete(':ref')
  @UseGuards(JwtAuthGuard)
  async deleteHomeCareRealisationremove(
    @Param('ref') ref: string
    ): Promise<MhouseResponseInterface> {
    const data = await this.homeCareRealisationService.deleteHomeCareRealisation(ref);
    return {
      data: data,
      message: "Partage effectué avec succès",
      code: HttpStatus.OK
    };
  }
}
