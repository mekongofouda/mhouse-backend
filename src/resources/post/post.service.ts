import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PostDto } from './dto/post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostEntity } from './entities/post.entity';
import { ListPostDto } from './dto/list-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AccountEntity } from 'src/resources/account/entities/account.entity';

@Injectable()
export class PostService {

  constructor(
    @InjectRepository(PostEntity) 
    private readonly postRepository: Repository<PostEntity>,

    @InjectRepository(PostEntity) 
    private readonly accountRepository: Repository<AccountEntity>

  ){}

  async post(postDto: PostDto, account: any): Promise<PostEntity> {
    const post = this.postRepository.create(postDto);
    post.account = account;
    return await this.postRepository.save(post);
  }

  async listPost(listPostDto: ListPostDto, account: any): Promise<PostEntity[]>{
    
    const userAccount = await this.accountRepository.create(account);
    console.log(userAccount[0].posts)
    let listPosts: PostEntity[] = [];
    if (userAccount == null) {
      throw new HttpException("Post not found", HttpStatus.NOT_FOUND);
    }
    listPosts = userAccount[0].posts;
    return await listPosts;

  }

  async showPostDetail(refPost: string) {
    const post = await this.postRepository.findOneBy({refPost});
    if (post == null) {
      throw new HttpException("Post not found", HttpStatus.NOT_FOUND)
    }    
    return post;
  }

  // async updatePost(refPost: string, updatePostDto: UpdatePostDto) {
  //   const post = await this.postRepository.findOne({where:{refPost}});
  //   if (post == null) {
  //     throw new HttpException("Post not found", HttpStatus.NOT_FOUND)
  //   }    
  //   Object.assign(post, updatePostDto);
  //   return await this.postRepository.save(post);
  // }

  // async deletePost(refPost: string) {
  //   const post = await this.postRepository.findOneBy({refPost});
  //   if (post == null) {
  //     throw new HttpException("Post not found", HttpStatus.NOT_FOUND)
  //   }    
  //   return await this.postRepository.softRemove(post);
  // }
}
