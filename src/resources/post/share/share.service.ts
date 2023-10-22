import { BadRequestException, ConflictException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ShareDto } from './dto/share.dto';
import { ListShareDto } from './dto/list-share.dto';
import { Share } from './entities/share.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostEntity } from 'src/resources/post/entities/post.entity';
import { AccountEntity } from '../../account/entities/account.entity';

@Injectable()
export class ShareService {

  constructor(
    @InjectRepository(AccountEntity) 
    private readonly accountRepository: Repository<AccountEntity>,

    @InjectRepository(PostEntity) 
    private readonly postRepository: Repository<PostEntity>,

    @InjectRepository(Share) 
    private readonly shareRepository: Repository<Share>
  ){}


  async share(shareDto: ShareDto): Promise<Share>  {
    //Get post to add at the share
    const post = await this.postRepository.findOneBy({refPost: shareDto.refPost});
    if (post == null) {
      throw new HttpException("Post not found", HttpStatus.NOT_FOUND)
    }

    //Create the share object with Dto to save it 
    const share = await this.shareRepository.create(shareDto); 
    if (share == null) {
      throw new BadRequestException("SHare not found");
    }

    //Set properties
    share.post = post;

    try {
      await this.shareRepository.save(share);
    } catch (error) {
      throw new ConflictException("L'email et le numéro de téléphone doivent être déjà utilisés");
    }
    return share;
  }

  async listShare(listShareDto: ListShareDto, account: any): Promise<Share[]> {
    let listShares: Share[];

    let shares: Share[] = [];

    if (listShareDto.refAccount != undefined) {
      const userAccount = await this.accountRepository.findOneBy({refAccount: listShareDto.refAccount});
      if (userAccount == null) {
        throw new HttpException("Account not found", HttpStatus.NOT_FOUND);
      } 
      userAccount.posts.filter(post => {
        listShares.concat(post.shares)
      });
    } else if (listShareDto.all == 1){
      listShares = await this.shareRepository.find();
    } else {
      account.discussions.filter(discussion => {
        listShares.concat(discussion.offers)
      });
    }

    if (listShareDto.refPost != undefined) {
      const post = await this.postRepository.findOneBy({refPost: listShareDto.refPost});
      if (post == null) {
        throw new HttpException("Service not found", HttpStatus.NOT_FOUND);
      } 
      listShares.filter(offer => {
        if (offer.post == post) {
          shares.push(offer);
        }      
      });
      listShares = shares;
    } 
    listShares.filter(post => {
      if (listShareDto.createdAt != undefined) {
        if (post.createdAt.toDateString() == listShareDto.createdAt.toDateString()) {
          shares.push(post);
        }
      }      
      if (listShareDto.updatedAt != undefined) {
        if (post.updatedAt.toDateString() == listShareDto.updatedAt.toDateString()) {
          shares.push(post);
        }
      }   
    });

    if ((shares.length == 0) 
    && ((listShareDto.createdAt != undefined)||(listShareDto.updatedAt != undefined))
    ) {
      throw new HttpException("Message not found", HttpStatus.NOT_FOUND);
    } else if (shares.length != 0) {
      listShares = shares;
    }

    return listShares;
  }

  async showShareDetail(refShare: string) {
    const share = await this.shareRepository.findOneBy({refShare});
    if (share == null) {
      throw new HttpException("Share not found", HttpStatus.NOT_FOUND)
    }    
    return share;
  }
}
