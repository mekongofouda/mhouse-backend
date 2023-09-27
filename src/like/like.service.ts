import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { LikeDto } from './dto/like.dto';
import { Like } from './entities/like.entity';
import { ListLikeDto } from './dto/list-like.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class LikeService {

  constructor(
    @InjectRepository(Like) 
    private readonly likeRepository: Repository<Like>
  ){}

  async like(likeDto: LikeDto): Promise<Like> {
    return await this.likeRepository.save(likeDto);
  }

  async toogleLike(refLike: string): Promise<Like> {
    const like = await this.likeRepository.findOne({where:{refLike}});
    if (like == null) {
      throw new HttpException("Offer not found", HttpStatus.NOT_FOUND)
    }    
    like.isLiked = true;
    return await this.likeRepository.save(like);
  }

  async listLike(listLikeDto: ListLikeDto): Promise<Like[]> {
    const refUser = listLikeDto.refUser;
    const refPost = listLikeDto.refPost;
    const createdAt = listLikeDto.createdAt;
    const updatedAt = listLikeDto.updatedAt;

    const qb = this.likeRepository.createQueryBuilder("like");

    qb.select("like")
    if (refUser) {
      qb.where("like.refUser = :refUser")
      .setParameters({
        refUser
      })
    }
    if (refPost) {
      qb.andWhere("like.refRole = :refRole")
      .setParameters({
        refPost
      })
    }
    if (createdAt) {
      qb.where("like.createdAt = :createdAt")
      .setParameters({
        createdAt
      })
    }
    if (updatedAt) {
      qb.where("like.updatedAt = :updatedAt")
      .setParameters({
        updatedAt
      })
    }
    return await qb.getRawMany();
  }

  async showLikeDetail(refLike: string) {
    const like = await this.likeRepository.findOne({where:{refLike}});
    if (like == null) {
      throw new HttpException("Like not found", HttpStatus.NOT_FOUND)
    }    
    return like;
  }
}
