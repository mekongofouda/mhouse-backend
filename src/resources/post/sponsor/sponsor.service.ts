import { ConflictException, HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { SponsorDto } from './dto/sponsor.dto';
import { ListSponsorDto } from './dto/list-sponsor.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Sponsor } from './entities/sponsor.entity';
import { Repository } from 'typeorm';
import { PostEntity } from 'src/resources/post/entities/post.entity';
import { AccountEntity } from '../../account/entities/account.entity';
import { Utils } from 'src/generics/utils';
import { FunctionPrivilegeEnum } from 'src/enums/function.privilege.enum';

@Injectable()
export class SponsorService extends Utils{

  constructor(

    @InjectRepository(AccountEntity) 
    private readonly accountRepository: Repository<AccountEntity>,

    @InjectRepository(PostEntity) 
    private readonly postRepository: Repository<PostEntity>,

    @InjectRepository(Sponsor) 
    private readonly sponsorRepository: Repository<Sponsor>

  ){
    super()
  }

  async sponsor(sponsorDto: SponsorDto, account: any): Promise<Sponsor> {

    const userAccount = await this.accountRepository.findOneBy({refAccount: account.refAccount});
    if(userAccount != null) {
      if (this.IsAuthorised(userAccount, FunctionPrivilegeEnum.ADD_DISCUSSION) == false) {
        throw new UnauthorizedException();
      }
    } else if (userAccount == null) {
      throw new HttpException("Account not found", HttpStatus.NOT_FOUND)
    }

    const sponsor = await this.sponsorRepository.create(sponsorDto); 
    const post = await this.postRepository.findOneBy({refPost: sponsorDto.refPost});
    if (post == null) {
      throw new HttpException("Post not found", HttpStatus.NOT_FOUND)
    }
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

    const userAccount = await this.accountRepository.findOneBy({refAccount: account.refAccount});
    if(userAccount != null) {
      if (this.IsAuthorised(userAccount, FunctionPrivilegeEnum.ADD_DISCUSSION) == false) {
        throw new UnauthorizedException();
      }
    }

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

  async showSponsorDetail(refSponsor: string, account: AccountEntity) {

    const userAccount = await this.accountRepository.findOneBy({refAccount: account.refAccount});
    if(userAccount != null) {
      if (this.IsAuthorised(userAccount, FunctionPrivilegeEnum.ADD_DISCUSSION) == false) {
        throw new UnauthorizedException();
      }
    }

    const sponsor = await this.sponsorRepository.findOneBy({refSponsor});
    if (sponsor == null) {
      throw new HttpException("Sponsor not found", HttpStatus.NOT_FOUND)
    }    
    
    return sponsor;

  }
}
