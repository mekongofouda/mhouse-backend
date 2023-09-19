import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, HttpException, Query } from '@nestjs/common';
import { OfferService } from './offer.service';
import { OfferDto } from './dto/offer.dto';
import { UpdateOfferDto } from './dto/update-offer.dto';
import { ReferencePipe } from 'src/pipes/reference/reference.pipe';
import { ListOfferDto } from './dto/list-offer.dto';
import { ToogleValidateOfferDto } from './dto/toogle-validate-offer.dto';
import { DatePipe } from 'src/pipes/date/date.pipe';

@Controller('offer')
export class OfferController {

  constructor(
    private readonly offerService: OfferService,
  ) {}

  @Post()
  offer(
    @Body(ReferencePipe, DatePipe) offerDto: OfferDto
    ) {
    return this.offerService.offer(offerDto);
  }

  @Patch(':ref')
  toogleValidateOffer(
    @Param('ref') ref: string, 
    @Body() toogleValidateOfferDto: ToogleValidateOfferDto
  ) {
    return this.offerService.toogleValidateOffer(ref, toogleValidateOfferDto);
  }

  @Get()
  listOffer(
    @Query() listOfferDto: ListOfferDto
  ) {
    if (!this.offerService.listOffer(listOfferDto)) {
      throw new HttpException("Offer not found", HttpStatus.NOT_FOUND)
    }
    return this.offerService.listOffer(listOfferDto);
  }

  @Get(':ref')
  showOfferDetail(
    @Param('ref') ref: string
    ) {
    if (!this.offerService.showOfferDetail(ref)) {
      throw new HttpException("Offer not found", HttpStatus.NOT_FOUND)
    }
    return this.offerService.showOfferDetail(ref);
  }

  @Patch(':ref')
  updateOffer(
    @Param('ref') ref: string, 
    @Body() updateOfferDto: UpdateOfferDto
  ) {
    return this.offerService.updateOffer(ref, updateOfferDto);
  }

  @Delete(':ref')
  deleteOffer(
    @Param('ref') ref: string
    ) {
    return this.offerService.deleteOffer(ref);
  }
}
