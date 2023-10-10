import { BadRequestException, ConflictException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { LikeDto } from './dto/like.dto';
import { Like } from './entities/like.entity';
import { ListLikeDto } from './dto/list-like.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostEntity } from 'src/resources/post/entities/post.entity';

@Injectable()
export class LikeService {

  constructor(
    @InjectRepository(PostEntity) 
    private readonly postRepository: Repository<PostEntity>,

    @InjectRepository(Like) 
    private readonly likeRepository: Repository<Like>

  ){}

  async like(likeDto: LikeDto): Promise<Like> {
    //Get post to add at the like
    const post = await this.postRepository.findOneBy({refPost: likeDto.refPost});
    if (!post) {
      throw new HttpException("Post not found", HttpStatus.NOT_FOUND)
    }

    //Create the like object whit dto to save it 
    const like = await this.likeRepository.create(likeDto); 
    if (!like) {
      throw new BadRequestException("Post not found");
    }

    //Set properties
    like.post = post;
    like.isLiked = likeDto.isLiked;
    
    //Persist like
    try {
      await this.likeRepository.save(like);
    } catch (error) {
      throw new ConflictException("L'email et le numéro de téléphone doivent être déjà utilisés");
    }
    return like;
  }

  // async toogleLike(refLike: string): Promise<Like> {
  //   const like = await this.likeRepository.findOne({where:{refLike}});
  //   if (like == null) {
  //     throw new HttpException("Offer not found", HttpStatus.NOT_FOUND)
  //   }    
  //   like.isLiked = true;
  //   return await this.likeRepository.save(like);
  // }

  async listLike(listLikeDto: ListLikeDto): Promise<Like[]> {
    const post = await this.postRepository.findOneBy({refPost: listLikeDto.refPost});
    let listLikes: Like[] = [];
    if (post == null) {
      throw new HttpException("Post not found", HttpStatus.NOT_FOUND);
    }
    listLikes = post.likes;
    return await listLikes;
  }

  async showLikeDetail(refLike: string) {
    const like = await this.likeRepository.findOneBy({refLike});
    if (like == null) {
      throw new HttpException("Like not found", HttpStatus.NOT_FOUND)
    }    
    return like;
  }
}
