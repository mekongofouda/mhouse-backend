import { Controller, Get, Post, Body, Patch, Param, UseGuards, HttpStatus } from '@nestjs/common';
import { RealEstateService } from './real-estate.service';
import { AddRealEstateDto } from './dto/add-real-estate.dto';
import { UpdateRealEstateDto } from './dto/update-real-estate.dto';
import { ReferencePipe } from 'src/pipes/reference/reference.pipe';
import { JwtAuthGuard } from 'src/resources/account/auth/auth.guard';
import { MhouseResponseInterface } from 'src/interfaces/mhouse-response.interface';
import { Account } from 'src/decorators/account.decorator';

@Controller('real-estate')
export class RealEstateController {
  
  constructor(
    private readonly realEstateService: RealEstateService
    ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async addRealEstate(
    @Body(ReferencePipe) addRealEstateDto:AddRealEstateDto,
    @Account() account
    ): Promise<MhouseResponseInterface> {
    const data = await this.realEstateService.addRealEstate(addRealEstateDto, account);
    return {
      data: data,
      message: "Realestate ajouté avec succès",
      code: HttpStatus.OK
    }
  }

  @Get(':ref')
  @UseGuards(JwtAuthGuard)
  async showRealEstateDetail(
    @Param('ref') ref: string,
    @Account() account
    ): Promise<MhouseResponseInterface> {
    const data = await this.realEstateService.showRealEstateDetail(ref, account);
    return {
      data: data,
      message: "Partage effectué avec succès",
      code: HttpStatus.OK
    }
  }

  @Patch(':ref')
  @UseGuards(JwtAuthGuard)
  async updateRealEstate(
    @Param('ref') ref: string, 
    @Body() updateRealEstateDto: UpdateRealEstateDto,
    @Account() account
    ): Promise<MhouseResponseInterface> {
    const data = await this.realEstateService.updateRealEstate(ref, updateRealEstateDto, account);
    return {
      data: data,
      message: "Partage effectué avec succès",
      code: HttpStatus.OK
    }
  }
}
