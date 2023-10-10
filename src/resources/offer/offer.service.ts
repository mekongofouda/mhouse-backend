import { BadRequestException, ConflictException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { OfferDto } from './dto/offer.dto';
import { UpdateOfferDto } from './dto/update-offer.dto';
import { Offer } from './entities/offer.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ListOfferDto } from './dto/list-offer.dto';
import { PostEntity } from 'src/resources/post/entities/post.entity';

@Injectable()
export class OfferService {

  constructor(
    @InjectRepository(PostEntity) 
    private readonly postRepository: Repository<PostEntity>,

    @InjectRepository(Offer) 
    private readonly offerRepository: Repository<Offer>
  ){}

  async offer(offerDto: OfferDto) : Promise<Offer>  {

    //Get post to add at the offer
    const post = await this.postRepository.findOneBy({refPost: offerDto.refPost});
    if (!post) {
      throw new HttpException("Post not found", HttpStatus.NOT_FOUND)
    }

    //Create the offer object whit dto to save it 
    const offer = await this.offerRepository.create(offerDto); 
    if (!offer) {
      throw new BadRequestException("Post not found");
    }

    //Set properties
    offer.post = post;
    
    try {
      await this.offerRepository.save(offer);
    } catch (error) {
      throw new ConflictException("L'email et le numéro de téléphone doivent être déjà utilisés");
    }
    return offer;
  }

  // async toogleValidateOffer(refOffer: string): Promise<Offer> {
  //   const offer = await this.offerRepository.findOne({where:{refOffer}});
  //   if (offer == null) {
  //     throw new HttpException("Offer not found", HttpStatus.NOT_FOUND)
  //   }    
  //   return await this.offerRepository.save(offer);

  // }

  async listOffer(listOfferDto: ListOfferDto): Promise<Offer[]> {
    const post = await this.postRepository.findOneBy({refPost: listOfferDto.refPost});
    let listOffers: Offer[] = [];
    if (post == null) {
      throw new HttpException("Post not found", HttpStatus.NOT_FOUND);
    }
    listOffers = post.offers;
    return await listOffers;
  }

  async showOfferDetail(refOffer: string) {
    const offer = await this.offerRepository.findOneBy({refOffer});
    if (offer == null) {
      throw new HttpException("Offer not found", HttpStatus.NOT_FOUND)
    }    
    return offer;
  }

  // async updateOffer(refOffer: string, updateOfferDto: UpdateOfferDto) {
  //   const offer = await this.offerRepository.findOne({where:{refOffer}});
  //   if (offer == null) {
  //     throw new HttpException("Offer not found", HttpStatus.NOT_FOUND)
  //   }    
  //   Object.assign(offer, updateOfferDto);
  //   return await this.offerRepository.save(offer);
  // }

  // async deleteOffer(refOffer: string) {
  //   const offer = await this.offerRepository.findOneBy({refOffer});
  //   if (offer == null) {
  //     throw new HttpException("Offer not found", HttpStatus.NOT_FOUND)
  //   }    
  //   return await this.offerRepository.softRemove(offer);
  // }
}