import { Injectable } from '@nestjs/common';
import { OfferDto } from './dto/offer.dto';
import { UpdateOfferDto } from './dto/update-offer.dto';
import { ToogleValidateOfferDto } from './dto/toogle-validate-offer.dto';
import { Offer } from './entities/offer.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ListOfferDto } from './dto/list-offer.dto';

@Injectable()
export class OfferService {

  constructor(
    @InjectRepository(Offer) 
    private readonly offerRepository: Repository<Offer>
  ){}

  offer(offerDto: OfferDto) {
    return 'This action adds a new offer';
  }

  toogleValidateOffer(refOffer: string, toogleValidateOfferDto: ToogleValidateOfferDto) {
    return `This action updates a #${refOffer} offer`;
  }

  async listOffer(listOfferDto: ListOfferDto): Promise<Offer[]> {
    return await this.offerRepository.find();
  }

  showOfferDetail(refOffer: string) {
    return `This action returns a #${refOffer} offer`;
  }

  updateOffer(refOffer: string, updateOfferDto: UpdateOfferDto) {
    return `This action updates a #${refOffer} offer`;
  }

  deleteOffer(refOffer: string) {
    return `This action removes a #${refOffer} offer`;
  }
}
