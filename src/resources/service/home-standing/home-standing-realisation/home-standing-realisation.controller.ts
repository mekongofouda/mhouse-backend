import { Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpStatus } from '@nestjs/common';
import { HomeStandingRealisationService } from './home-standing-realisation.service';
import { AddHomeStandingRealisationDto } from './dto/add-home-standing-realisation.dto';
import { UpdateHomeStandingRealisationDto } from './dto/update-home-standing-realisation.dto';
import { Account } from 'src/decorators/account.decorator';
import { ListHomeStandingRealisationDto } from './dto/list-home-standing-realisation.dto';
import { MhouseResponseInterface } from 'src/interfaces/mhouse-response.interface';
import { ReferencePipe } from 'src/pipes/reference/reference.pipe';
import { AccountEntity } from 'src/resources/account/entities/account.entity';

@Controller('home-standing-realisation')
export class HomeStandingRealisationController {
  constructor(private readonly homeStandingRealisationService: HomeStandingRealisationService) {}

  @Post()
  async addHomeStandingRealisation(
    @Body(ReferencePipe) addHomeStandingRealisationDto: AddHomeStandingRealisationDto,
    @Account() account
    ): Promise<MhouseResponseInterface> {
    const data = await this.homeStandingRealisationService.addHomeStandingRealisation(addHomeStandingRealisationDto, account);
    return {
      data: data,
      message: "HomeStandingRealisation ajouté avec succès",
      code: HttpStatus.OK
    };
  }

  @Get()
  async listHomeStandingRealisation(
    @Query() listHomeStandingRealisationDto: ListHomeStandingRealisationDto,
    @Account() account
  ): Promise<MhouseResponseInterface> {
    const data = await this.homeStandingRealisationService.listHomeStandingRealisation(listHomeStandingRealisationDto, account);
    return {
      data: data,
      message: "HomeStandingRealisation effectué avec succès",
      code: HttpStatus.OK
    };
  }

  @Get(':ref')
  async showHomeStandingRealisationDetail(
    @Param('ref') ref: string, 
    @Account() account: AccountEntity
    ): Promise<MhouseResponseInterface> {
    const data = await this.homeStandingRealisationService.showHomeStandingRealisationDetail(ref, account);
    return {
      data: data,
      message: "Partage effectué avec succès",
      code: HttpStatus.OK
    };
  }

  @Patch(':ref')
  async updateHomeStandingRealisation(
    @Param('ref') ref: string, 
  @Body() updateHomeStandingRealisationDto: UpdateHomeStandingRealisationDto, 
  @Account() account: AccountEntity
  ): Promise<MhouseResponseInterface> {
    const data = await this.homeStandingRealisationService.updateHomeStandingRealisation(ref, updateHomeStandingRealisationDto, account);
    return {
      data: data,
      message: "Partage effectué avec succès",
      code: HttpStatus.OK
    };
  }

  @Delete(':ref')
  async deleteHomeStandingRealisation(
    @Param('ref') ref: string, 
    @Account() account: AccountEntity
    ): Promise<MhouseResponseInterface> {
    const data = await this.homeStandingRealisationService.deleteHomeStandingRealisation(ref, account);
    return {
      data: data,
      message: "Partage effectué avec succès",
      code: HttpStatus.OK
    };
  }
}
