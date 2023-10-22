import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, HttpStatus } from '@nestjs/common';
import { OfferService } from './offer.service';
import { OfferDto } from './dto/offer.dto';
import { UpdateOfferDto } from './dto/update-offer.dto';
import { ReferencePipe } from 'src/pipes/reference/reference.pipe';
import { ListOfferDto } from './dto/list-offer.dto';
import { JwtAuthGuard } from 'src/resources/account/auth/auth.guard';
import { MhouseResponseInterface } from 'src/interfaces/mhouse-response.interface';
import { AccountEntity } from '../../account/entities/account.entity';
import { Account } from 'src/decorators/account.decorator';

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
      code: HttpStatus.OK
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
    @Query() listOfferDto: ListOfferDto,
    @Account() account: AccountEntity
  ): Promise<MhouseResponseInterface> {
    const data = await this.offerService.listOffer(listOfferDto, account);
    return {
      data: data,
      message: "Liste des offres obtenue avec succès",
      code: HttpStatus.OK
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
      code: HttpStatus.OK
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
