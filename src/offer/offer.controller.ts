import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { OfferService } from './offer.service';
import { OfferDto } from './dto/offer.dto';
import { UpdateOfferDto } from './dto/update-offer.dto';
import { ReferencePipe } from 'src/pipes/reference/reference.pipe';
import { ListOfferDto } from './dto/list-offer.dto';
import { Offer } from './entities/offer.entity';
import { JwtAuthGuard } from 'src/auth/auth.guard';

@Controller('offer')
export class OfferController {

  constructor(
    private readonly offerService: OfferService,
  ) {}

  @Post()
  async offer(
    @Body(ReferencePipe) offerDto: OfferDto
    ): Promise<Offer> {
    return await this.offerService.offer(offerDto);
  }

  @Patch(':ref')
  @UseGuards(JwtAuthGuard)
  toogleValidateOffer(
    @Param('ref') ref: string
  ): Promise<Offer> {
    return this.offerService.toogleValidateOffer(ref);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async listOffer(
    @Query() listOfferDto: ListOfferDto
  ): Promise<Offer[]> {
    return await this.offerService.listOffer(listOfferDto);
  }

  @Get(':ref')
  @UseGuards(JwtAuthGuard)
  async showOfferDetail(
    @Param('ref') ref: string
    ): Promise<Offer> {
    return await this.offerService.showOfferDetail(ref);
  }

  @Patch(':ref')
  @UseGuards(JwtAuthGuard)
  async updateOffer(
    @Param('ref') ref: string, 
    @Body() updateOfferDto: UpdateOfferDto
  ): Promise<Offer> {
    return await this.offerService.updateOffer(ref, updateOfferDto);
  }

  @Delete(':ref')
  @UseGuards(JwtAuthGuard)
  async deleteOffer(
    @Param('ref') ref: string
    ): Promise<Offer> {
    return await this.offerService.deleteOffer(ref);
  }
}
