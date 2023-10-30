import { ConflictException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Like } from './entities/like.entity';
import { ListLikeDto } from './dto/list-like.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostEntity } from 'src/resources/post/entities/post.entity';
import { AccountEntity } from '../../account/entities/account.entity';
import { LikeDto } from './dto/like.dto';

@Injectable()
export class LikeService {

  constructor(
    @InjectRepository(AccountEntity) 
    private readonly accountRepository: Repository<AccountEntity>,

    @InjectRepository(PostEntity) 
    private readonly postRepository: Repository<PostEntity>,

    @InjectRepository(Like) 
    private readonly likeRepository: Repository<Like>

  ){}

  async like(likeDto: LikeDto, account: any): Promise<Like> {

    let like = await this.likeRepository.create(likeDto);
    const userAccount = await this.accountRepository.findOneBy({refAccount: account.refAccount});
    if (userAccount == null) {
      throw new HttpException("Account not found", HttpStatus.NOT_FOUND)
    }
    const post  = await this.postRepository.findOneBy({refPost: likeDto.refPost});
    if (post == null) {
      throw new HttpException("Post not found", HttpStatus.NOT_FOUND)
    }
    like.account = userAccount;
    like.post = post; 
    try {
      await this.likeRepository.save(like);
    } catch (error) {
      throw new ConflictException(error.driverError.detail);
    }
    return like;
  }

  async unlike(refLike: string): Promise<Like> {

    const like = await this.likeRepository.findOneBy({refLike});
    if (like == null) {
      throw new HttpException("Post not found", HttpStatus.NOT_FOUND)
    }    
    if (like.isLiked == true) {
      like.isLiked = false;
    } else {
      like.isLiked = true;
    }
    try {
      await this.likeRepository.save(like);
    } catch (error) {
      throw new ConflictException(error.driverError.detail);
    }
    return like;
  }

  async listLike(listLikeDto: ListLikeDto, account: any): Promise<Like[]> {

    let listLikes: Like[] = [];
    let likes: Like[] = [];

    if (listLikeDto.refAccount != undefined) {
      const userAccount = await this.accountRepository.findOneBy({refAccount: listLikeDto.refAccount});
      if (userAccount == null) {
        throw new HttpException("Account not found", HttpStatus.NOT_FOUND);
      } 
      listLikes = userAccount.likes;
    } else if (listLikeDto.all == 1){
      listLikes = await this.likeRepository.find();
    } else {
      const userAccount = await this.accountRepository.findOneBy({refAccount: account.refAccount});
      if (userAccount == null) {
        throw new HttpException("Account not found", HttpStatus.NOT_FOUND);
      } 
      if (userAccount.likes != undefined) {
        listLikes = userAccount.likes;
      }
    }

    if (listLikeDto.refPost != undefined) {
      const post = await this.postRepository.findOneBy({refPost: listLikeDto.refPost});
      if (post == null) {
        throw new HttpException("Post not found", HttpStatus.NOT_FOUND);
      } 
      likes = post.likes;
      listLikes = post.likes;
    } 
    listLikes.filter(like => {
      if (listLikeDto.createdAt != undefined) {
        if (like.createdAt.toDateString() == listLikeDto.createdAt.toDateString()) {
          if (!likes.includes(like)) {
            likes.push(like);
          }
        }
      }      
      if (listLikeDto.updatedAt != undefined) {
        if (like.updatedAt.toDateString() == listLikeDto.updatedAt.toDateString()) {
          if (!likes.includes(like)) {
            likes.push(like);
          }
        }
      }   
    });

    if ((likes.length == 0) 
    && ((listLikeDto.createdAt != undefined)
    ||(listLikeDto.updatedAt != undefined)
    )) {
      throw new HttpException("Like not found", HttpStatus.NOT_FOUND);
    } else if (likes.length != 0) {
      listLikes = likes;
    }
    return listLikes;
  }

  async showLikeDetail(refLike: string) {
    const like = await this.likeRepository.findOneBy({refLike});
    if (like == null) {
      throw new HttpException("Like not found", HttpStatus.NOT_FOUND)
    }    
    return like;
  }
}
