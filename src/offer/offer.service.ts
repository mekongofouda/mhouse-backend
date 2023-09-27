import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { OfferDto } from './dto/offer.dto';
import { UpdateOfferDto } from './dto/update-offer.dto';
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

  async offer(offerDto: OfferDto) : Promise<Offer>  {
    return await this.offerRepository.save(offerDto);
  }

  async toogleValidateOffer(refOffer: string): Promise<Offer> {
    const offer = await this.offerRepository.findOne({where:{refOffer}});
    if (offer == null) {
      throw new HttpException("Offer not found", HttpStatus.NOT_FOUND)
    }    
    return await this.offerRepository.save(offer);

  }

  async listOffer(listOfferDto: ListOfferDto): Promise<Offer[]> {
    const refUser = listOfferDto.refUser;
    const refPost = listOfferDto.refPost;
    const createdAt = listOfferDto.createdAt;
    const updatedAt = listOfferDto.updatedAt;

    const qb = this.offerRepository.createQueryBuilder("offer");

    qb.select("offer")
    if (refUser) {
      qb.where("offer.refUser = :refUser")
      .setParameters({
        refUser
      })
    }
    
    if (refPost) {
      qb.andWhere("offer.refRole = :refRole")
      .setParameters({
        refPost
      })
    }

    if (createdAt) {
      qb.where("offer.resource = :resource")
      .setParameters({
        createdAt
      })
    } 

    if (updatedAt) {
      qb.where("offer.createdAt = :createdAt")
      .setParameters({
        updatedAt
      })
    }
    
    return await qb.getRawMany();
  }

  async showOfferDetail(refOffer: string) {
    const offer = await this.offerRepository.findOne({where:{refOffer}});
    console.log(offer);
    if (offer == null) {
      throw new HttpException("Offer not found", HttpStatus.NOT_FOUND)
    }    
    return offer;
  }

  async updateOffer(refOffer: string, updateOfferDto: UpdateOfferDto) {
    const offer = await this.offerRepository.findOne({where:{refOffer}});
    if (offer == null) {
      throw new HttpException("Offer not found", HttpStatus.NOT_FOUND)
    }    
    Object.assign(offer, updateOfferDto);
    return await this.offerRepository.save(offer);
  }

  async deleteOffer(refOffer: string) {
    const offer = await this.offerRepository.findOneBy({refOffer});
    if (offer == null) {
      throw new HttpException("Offer not found", HttpStatus.NOT_FOUND)
    }    
    return await this.offerRepository.softRemove(offer);
  }
}
