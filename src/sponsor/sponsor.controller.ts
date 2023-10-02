import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { SponsorService } from './sponsor.service';
import { SponsorDto } from './dto/sponsor.dto';
import { ListSponsorDto } from './dto/list-sponsor.dto';
import { ReferencePipe } from 'src/pipes/reference/reference.pipe';
import { Sponsor } from './entities/sponsor.entity';
import { JwtAuthGuard } from 'src/auth/auth.guard';

@Controller('sponsor')
export class SponsorController {
  constructor(
    private readonly sponsorService: SponsorService
    ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async sponsor(
    @Body(ReferencePipe) sponsorDto: SponsorDto
    ): Promise<Sponsor> {
    return await this.sponsorService.sponsor(sponsorDto);
  }

  // @Get()
  // @UseGuards(JwtAuthGuard)
  // async listSponsor(
  //   @Query() listSponsorDto: ListSponsorDto
  //   ): Promise<Sponsor[]> {
  //   return await this.sponsorService.listSponsor(listSponsorDto);
  // }

  // @Get(':ref')
  // @UseGuards(JwtAuthGuard)
  // async showSponsorDetail(
  //   @Param('ref') ref: string
  //   ): Promise<Sponsor> {
  //   return await this.sponsorService.showSponsorDetail(ref);
  // }

}
