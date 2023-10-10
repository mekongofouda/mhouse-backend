import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { SponsorService } from './sponsor.service';
import { SponsorDto } from './dto/sponsor.dto';
import { ListSponsorDto } from './dto/list-sponsor.dto';
import { ReferencePipe } from 'src/pipes/reference/reference.pipe';
import { JwtAuthGuard } from 'src/resources/auth/auth.guard';
import { MhouseResponseInterface } from 'src/interfaces/mhouse-response.interface';

@Controller('sponsor')
export class SponsorController {
  constructor(
    private readonly sponsorService: SponsorService
    ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async sponsor(
    @Body(ReferencePipe) sponsorDto: SponsorDto
    ): Promise<MhouseResponseInterface> {
    const data = await this.sponsorService.sponsor(sponsorDto);
    return {
      data: data,
      message: "Sponsor effectué avec succès",
      code:"200"
    }
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async listSponsor(
    @Query() listSponsorDto: ListSponsorDto
    ): Promise<MhouseResponseInterface> {
    const data = await this.sponsorService.listSponsor(listSponsorDto);
    return {
      data: data,
      message: "Liste des sponsors obtenue avec succès",
      code:"200"
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
      message: "Liste des offres obtenue avec succès",
      code:"200"
    };
  }

}
