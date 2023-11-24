import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpStatus } from '@nestjs/common';
import { HomeStandingService } from './home-standing.service';
import { AddHomeStandingDto } from './dto/add-home-standing.dto';
import { UpdateHomeStandingDto } from './dto/update-home-standing.dto';
import { JwtAuthGuard } from 'src/resources/account/auth/auth.guard';
import { ReferencePipe } from 'src/pipes/reference/reference.pipe';
import { MhouseResponseInterface } from 'src/interfaces/mhouse-response.interface';
import { AccountEntity } from 'src/resources/account/entities/account.entity';
import { Account } from 'src/decorators/account.decorator';

@Controller('home-standing')
export class HomeStandingController {
  constructor(private readonly homeStandingService: HomeStandingService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async addHomeStanding(
    @Body(ReferencePipe) addHomeStandingDto: AddHomeStandingDto,
    @Account() account:AccountEntity
  ): Promise<MhouseResponseInterface> {
    const data = await this.homeStandingService.addHomeStanding(addHomeStandingDto, account);
    return {
      data: data,
      message: "Partage effectué avec succès",
      code: HttpStatus.OK
    }
  }

  @Get(':ref')
  @UseGuards(JwtAuthGuard)
  async showHotelHomeStanding(
    @Param('ref') ref: string,
    @Account() account:AccountEntity
  ): Promise<MhouseResponseInterface> {
    const data = await this.homeStandingService.showHotelHomeStanding(ref, account);
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
    @Body() updateHomeStandingDto: UpdateHomeStandingDto,
    @Account() account:AccountEntity
  ): Promise<MhouseResponseInterface> {
    const data = await this.homeStandingService.updateHomeStanding(ref, updateHomeStandingDto, account);
    return {
      data: data,
      message: "Partage effectué avec succès",
      code: HttpStatus.OK
    }
  }

}
