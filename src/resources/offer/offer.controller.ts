import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { OfferService } from './offer.service';
import { OfferDto } from './dto/offer.dto';
import { UpdateOfferDto } from './dto/update-offer.dto';
import { ReferencePipe } from 'src/pipes/reference/reference.pipe';
import { ListOfferDto } from './dto/list-offer.dto';
import { JwtAuthGuard } from 'src/resources/auth/auth.guard';
import { MhouseResponseInterface } from 'src/interfaces/mhouse-response.interface';

@Controller('offer')
export class OfferController {

  constructor(
    private readonly offerService: OfferService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async offer(
    @Body(ReferencePipe) offerDto: OfferDto
    ): Promise<MhouseResponseInterface> {
    const data = await this.offerService.offer(offerDto);
    return {
      data: data,
      message: "Offre proposée avec succès",
      code:"200"
    }
  }

  // @Patch(':ref')
  // @UseGuards(JwtAuthGuard)
  // toogleValidateOffer(
  //   @Param('ref') ref: string
  // ): Promise<MhouseResponseInterface> {
  //   return this.offerService.toogleValidateOffer(ref);
  // }

  @Get()
  @UseGuards(JwtAuthGuard)
  async listOffer(
    @Query() listOfferDto: ListOfferDto
  ): Promise<MhouseResponseInterface> {
    const data = await this.offerService.listOffer(listOfferDto);
    return {
      data: data,
      message: "Liste des offres obtenue avec succès",
      code:"200"
    }
  }

  @Get(':ref')
  @UseGuards(JwtAuthGuard)
  async showOfferDetail(
    @Param('ref') ref: string
    ): Promise<MhouseResponseInterface> {
    const data = await this.offerService.showOfferDetail(ref);
    return {
      data: data,
      message: "Liste des offres obtenue avec succès",
      code:"200"
    };
  }

  // @Patch(':ref')
  // @UseGuards(JwtAuthGuard)
  // async updateOffer(
  //   @Param('ref') ref: string, 
  //   @Body() updateOfferDto: UpdateOfferDto
  // ): Promise<MhouseResponseInterface> {
  //   return await this.offerService.updateOffer(ref, updateOfferDto);
  // }

  // @Delete(':ref')
  // @UseGuards(JwtAuthGuard)
  // async deleteOffer(
  //   @Param('ref') ref: string
  //   ): Promise<MhouseResponseInterface> {
  //   return await this.offerService.deleteOffer(ref);
  // }
}
