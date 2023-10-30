import { BadRequestException, ConflictException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { SponsorDto } from './dto/sponsor.dto';
import { ListSponsorDto } from './dto/list-sponsor.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Sponsor } from './entities/sponsor.entity';
import { Repository } from 'typeorm';
import { PostEntity } from 'src/resources/post/entities/post.entity';
import { AccountEntity } from '../../account/entities/account.entity';

@Injectable()
export class SponsorService {

  constructor(
    @InjectRepository(AccountEntity) 
    private readonly accountRepository: Repository<AccountEntity>,

    @InjectRepository(PostEntity) 
    private readonly postRepository: Repository<PostEntity>,

    @InjectRepository(Sponsor) 
    private readonly sponsorRepository: Repository<Sponsor>
  ){}

  async sponsor(sponsorDto: SponsorDto, account: any): Promise<Sponsor> {

    const userAccount = await this.accountRepository.findOneBy({refAccount: account.refAccount});
    if (userAccount == null) {
      throw new HttpException("Account not found", HttpStatus.NOT_FOUND)
    }

    //Create the sponsor object with Dto to save it 
    const sponsor = await this.sponsorRepository.create(sponsorDto); 

    //Get post to add at the sponsor
    const post = await this.postRepository.findOneBy({refPost: sponsorDto.refPost});
    if (post == null) {
      throw new HttpException("Post not found", HttpStatus.NOT_FOUND)
    }

    //Set properties
    sponsor.account = account;
    sponsor.post = post;

    try {
      await this.sponsorRepository.save(sponsor);
    } catch (error) {
      throw new ConflictException(error.driverError.detail);
    }
    return sponsor;
    
  }

  async listSponsor(listSponsorDto: ListSponsorDto, account: any) {

    let listSponsors: Sponsor[] = [];
    let sponsors: Sponsor[] = [];

    if (listSponsorDto.refAccount != undefined) {
      const userAccount = await this.accountRepository.findOneBy({refAccount: listSponsorDto.refAccount});
      if (userAccount == null) {
        throw new HttpException("Account not found", HttpStatus.NOT_FOUND);
      } 
      listSponsors = userAccount.sponsors;
    } else if (listSponsorDto.all == 1){
      listSponsors = await this.sponsorRepository.find();
    } else {
      listSponsors = account.sponsors;
    }

    if (listSponsorDto.refPost != undefined) {
      const post = await this.postRepository.findOneBy({refPost: listSponsorDto.refPost});
      if (post == null) {
        throw new HttpException("Post not found", HttpStatus.NOT_FOUND);
      } 
      sponsors = post.sponsors; 
      listSponsors = post.sponsors;
    } 

    listSponsors.filter(sponsor => {
      if (listSponsorDto.createdAt != undefined) {
        if (sponsor.createdAt.toDateString() == listSponsorDto.createdAt.toDateString()) {
          if (!sponsors.includes(sponsor)) {
            sponsors.push(sponsor);
            }
          }
      }      
      if (listSponsorDto.updatedAt != undefined) {
        if (sponsor.updatedAt.toDateString() == listSponsorDto.updatedAt.toDateString()) {
          if (!sponsors.includes(sponsor)) {
            sponsors.push(sponsor);
          }
        }
      } 
    });

    if ((sponsors.length == 0) 
      && ((listSponsorDto.createdAt != undefined)
      ||(listSponsorDto.updatedAt != undefined)
      )) {
      throw new HttpException("Sponsor not found", HttpStatus.NOT_FOUND);
    }  else if (sponsors.length != 0) {
      listSponsors = sponsors;
    }
    return listSponsors;
  }

  async showSponsorDetail(refSponsor: string) {
    const sponsor = await this.sponsorRepository.findOneBy({refSponsor});
    if (sponsor == null) {
      throw new HttpException("Sponsor not found", HttpStatus.NOT_FOUND)
    }    
    return sponsor;
  }
}
