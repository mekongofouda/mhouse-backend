import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, HttpStatus } from '@nestjs/common';
import { SponsorService } from './sponsor.service';
import { SponsorDto } from './dto/sponsor.dto';
import { ListSponsorDto } from './dto/list-sponsor.dto';
import { ReferencePipe } from 'src/pipes/reference/reference.pipe';
import { JwtAuthGuard } from 'src/resources/account/auth/auth.guard';
import { MhouseResponseInterface } from 'src/interfaces/mhouse-response.interface';
import { Account } from 'src/decorators/account.decorator';
import { AccountEntity } from '../../account/entities/account.entity';

@Controller('sponsor')
export class SponsorController {
  constructor(
    private readonly sponsorService: SponsorService
    ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async sponsor(
    @Body(ReferencePipe) sponsorDto: SponsorDto,
    @Account() account:AccountEntity
    ): Promise<MhouseResponseInterface> {
    const data = await this.sponsorService.sponsor(sponsorDto, account);
    return {
      data: data,
      message: "Sponsor effectué avec succès",
      code: HttpStatus.OK
    }
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async listSponsor(
    @Query() listSponsorDto: ListSponsorDto,
    @Account() account: AccountEntity
    ): Promise<MhouseResponseInterface> {
    const data = await this.sponsorService.listSponsor(listSponsorDto, account);
    return {
      data: data,
      message: "Liste des sponsors obtenue avec succès",
      code: HttpStatus.OK
    }
  }

  @Get(':ref')
  @UseGuards(JwtAuthGuard)
  async showSponsorDetail(
    @Param('ref') ref: string
    ): Promise<MhouseResponseInterface> {
    const data = await this.sponsorService.showSponsorDetail(ref);
    return {
      data: data,
      message: "Détails du sponsor obtenus avec succès avec succès",
      code: HttpStatus.OK
    };
  }

}
