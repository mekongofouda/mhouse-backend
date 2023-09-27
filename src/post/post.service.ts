import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PostDto } from './dto/post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostEntity } from './entities/post.entity';
import { ListPostDto } from './dto/list-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PostService {

  constructor(
    @InjectRepository(PostEntity) 
    private readonly postRepository: Repository<PostEntity>
  ){}

  async post(postDto: PostDto): Promise<PostEntity> {
    return await this.postRepository.save(postDto);
  }

  async listPost(listPostDto: ListPostDto): Promise<PostEntity[]>{
    const refUser = listPostDto.refUser;
    const refService = listPostDto.refService;
    const createdAt = listPostDto.createdAt;
    const updatedAt = listPostDto.updatedAt;

    const qb = this.postRepository.createQueryBuilder("post");

    qb.select("post")
    if (refUser) {
      qb.where("post.refUser = :refUser")
      .setParameters({
        refUser
      })
    }
    if (refService) {
      qb.andWhere("post.refRole = :refRole")
      .setParameters({
        refService
      })
    }
    if (createdAt) {
      qb.where("post.createdAt = :createdAt")
      .setParameters({
        createdAt
      })
    }
    if (updatedAt) {
      qb.where("post.updatedAt = :updatedAt")
      .setParameters({
        updatedAt
      })
    }
    return await qb.getRawMany();
  }

  async showPostDetail(refPost: string) {
    const post = await this.postRepository.findOne({where:{refPost}});
    console.log(post);
    if (post == null) {
      throw new HttpException("Post not found", HttpStatus.NOT_FOUND)
    }    
    return post;
  }

  async updatePost(refPost: string, updatePostDto: UpdatePostDto) {
    const post = await this.postRepository.findOne({where:{refPost}});
    if (post == null) {
      throw new HttpException("Post not found", HttpStatus.NOT_FOUND)
    }    
    Object.assign(post, updatePostDto);
    return await this.postRepository.save(post);
  }

  async deletePost(refPost: string) {
    const post = await this.postRepository.findOneBy({refPost});
    if (post == null) {
      throw new HttpException("Post not found", HttpStatus.NOT_FOUND)
    }    
    return await this.postRepository.softRemove(post);
  }
}
