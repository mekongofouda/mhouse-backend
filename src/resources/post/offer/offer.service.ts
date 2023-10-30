import { ConflictException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { OfferDto } from './dto/offer.dto';
import { UpdateOfferDto } from './dto/update-offer.dto';
import { Offer } from './entities/offer.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ListOfferDto } from './dto/list-offer.dto';
import { PostEntity } from 'src/resources/post/entities/post.entity';
import { AccountEntity } from '../../account/entities/account.entity';

@Injectable()
export class OfferService {

  constructor(
    @InjectRepository(AccountEntity) 
    private readonly accountRepository: Repository<AccountEntity>,

    @InjectRepository(PostEntity) 
    private readonly postRepository: Repository<PostEntity>,

    @InjectRepository(Offer) 
    private readonly offerRepository: Repository<Offer>
  ){}

  async offer(offerDto: OfferDto) : Promise<Offer>  {

    //Get post to add at the offer
    const post = await this.postRepository.findOneBy({refPost: offerDto.refPost});
    if (post == null) {
      throw new HttpException("Post not found", HttpStatus.NOT_FOUND)
    }

    //Create the offer object whit dto to save it 
    const offer = await this.offerRepository.create(offerDto); 

    //Set properties
    offer.post = post;
    
    try {
      await this.offerRepository.save(offer);
    } catch (error) {
      console.log(error);
      throw new ConflictException(error.driverError.detail);
    }
    return offer;
  }

  async validateOffer(refOffer: string): Promise<Offer> {
    const offer = await this.offerRepository.findOne({where:{refOffer}});
    if (offer == null) {
      throw new HttpException("Offer not found", HttpStatus.NOT_FOUND)
    }    
    if (offer.status == "encours") {
      offer.status = "valid";
    } else {
      offer.status = "rejected";
    }
    return await this.offerRepository.save(offer);

  }

  async listOffer(listOfferDto: ListOfferDto, account: any): Promise<Offer[]> {

    let listOffers: Offer[] = [];
    let offers: Offer[] = [];

    if (listOfferDto.refAccount != undefined) {
      const userAccount = await this.accountRepository.findOneBy({refAccount: listOfferDto.refAccount});
      if (userAccount == null) {
        throw new HttpException("Account not found", HttpStatus.NOT_FOUND);
      } 
      listOffers = userAccount.offers;;
    } else if (listOfferDto.all == 1){
      listOffers = await this.offerRepository.find();
    } else {
      listOffers = account.offers;;
    }

    if (listOfferDto.refPost != undefined) {
      const post = await this.postRepository.findOneBy({refPost: listOfferDto.refPost});
      if (post == null) {
        throw new HttpException("Post not found", HttpStatus.NOT_FOUND);
      } 
      offers = post.offers;
      listOffers = post.offers;
    } 
    listOffers.filter(offer => {
      if (listOfferDto.createdAt != undefined) {
        if (offer.createdAt.toDateString() == listOfferDto.createdAt.toDateString()) {
          if (!offers.includes(offer)) {
            offers.push(offer);
          }
        }
      }      
      if (listOfferDto.updatedAt != undefined) {
        if (offer.updatedAt.toDateString() == listOfferDto.updatedAt.toDateString()) {
          if (!offers.includes(offer)) {
            offers.push(offer);
          }
        }
      }   
    });

    if ((offers.length == 0) 
    && ((listOfferDto.createdAt != undefined)
    ||(listOfferDto.updatedAt != undefined)
    )) {
      throw new HttpException("Offer not found", HttpStatus.NOT_FOUND);
    } else if (offers.length != 0) {
      listOffers = offers;
    }
    return await listOffers;
  }

  async showOfferDetail(refOffer: string) {
    const offer = await this.offerRepository.findOneBy({refOffer});
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
    try {
      await this.offerRepository.save(offer);
    } catch (error) {
      throw new ConflictException(error.driverError.detail);
    } 
    return offer;
  }

  async deleteOffer(refOffer: string) {
    const offer = await this.offerRepository.findOneBy({refOffer});
    if (offer == null) {
      throw new HttpException("Offer not found", HttpStatus.NOT_FOUND)
    }   
    try {
      await this.offerRepository.softRemove(offer);
    } catch (error) {
      throw new ConflictException(error.driverError.detail);
    } 
    return offer;
  }
}
