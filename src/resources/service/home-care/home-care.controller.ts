import { Controller, Get, Post, Body, Patch, Param, HttpStatus, UseGuards } from '@nestjs/common';
import { HomeCareService } from './home-care.service';
import { AddHomeCareDto } from './dto/add-home-care.dto';
import { UpdateHomeCareDto } from './dto/update-home-care.dto';
import { MhouseResponseInterface } from 'src/interfaces/mhouse-response.interface';
import { JwtAuthGuard } from 'src/resources/account/auth/auth.guard';
import { ReferencePipe } from 'src/pipes/reference/reference.pipe';
import { AccountEntity } from 'src/resources/account/entities/account.entity';
import { Account } from 'src/decorators/account.decorator';

@Controller('home-care')
export class HomeCareController {
  constructor(private readonly homeCareService: HomeCareService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async addHomeCare(
    @Body(ReferencePipe) createHomeCareDto: AddHomeCareDto, 
    @Account() account: AccountEntity
    ): Promise<MhouseResponseInterface> {
    const data = await this.homeCareService.addHomeCare(createHomeCareDto, account);
    return {
      data: data,
      message: "Homecare ajouté avec succès",
      code: HttpStatus.OK
    }
  }

  @Get(':ref')
  @UseGuards(JwtAuthGuard)
  async showHomCareDetail(
    @Param('ref') ref: string, 
    @Account() account: AccountEntity
    ): Promise<MhouseResponseInterface> {
    const data = await this.homeCareService.showHomCareDetail(ref, account);
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
    @Body() updateHomeCareDto: UpdateHomeCareDto, 
    @Account() account: AccountEntity
    ): Promise<MhouseResponseInterface> {
    const data = await this.homeCareService.updateHomCare(ref, updateHomeCareDto, account);
    return {
      data: data,
      message: "Homecare mise à jour avec succès",
      code: HttpStatus.OK
    }
  }

}
