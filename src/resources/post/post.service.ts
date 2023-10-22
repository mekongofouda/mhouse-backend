import { ConflictException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PostDto } from './dto/post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostEntity } from './entities/post.entity';
import { ListPostDto } from './dto/list-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AccountEntity } from 'src/resources/account/entities/account.entity';
import { Service } from '../service/entities/service.entity';

@Injectable()
export class PostService {

  constructor(
    @InjectRepository(PostEntity) 
    private readonly postRepository: Repository<PostEntity>,

    @InjectRepository(Service) 
    private readonly serviceRepository: Repository<Service>,

    @InjectRepository(AccountEntity) 
    private readonly accountRepository: Repository<AccountEntity>

  ){}

  async post(postDto: PostDto, account: any): Promise<PostEntity> {

    const post = await this.postRepository.create(postDto);
    const userAccount = await this.accountRepository.create(account)[0];

    const service = await this.serviceRepository.findOneBy({refService: postDto.refService});
    if (service == null) {
      throw new HttpException("Service not found", HttpStatus.NOT_FOUND);
    }

    post.account = userAccount;
    post.service = service;

    try {
      await this.postRepository.save(post);
    } catch (error) {
      throw new ConflictException(error.driverError.detail);
    }

    return post;
  }

  async listPost(listPostDto: ListPostDto, account: any): Promise<PostEntity[]>{

    let listPosts: PostEntity[]=[];
    let posts: PostEntity[]=[];

    if (listPostDto.refAccount != undefined) {
      const userAccount = await this.accountRepository.findOneBy({refAccount: listPostDto.refAccount});
      if (userAccount == null) {
        throw new HttpException("Account not found", HttpStatus.NOT_FOUND);
      } 
      listPosts = userAccount.posts;
    } else if (listPostDto.all == 1){
      listPosts = await this.postRepository.find();
    } else {
      listPosts = account.posts;  
    }

    if (listPostDto.refService != undefined) {
      const service = await this.serviceRepository.findOneBy({refService: listPostDto.refService});
      if (service == null) {
        throw new HttpException("Service not found", HttpStatus.NOT_FOUND);
      } 
      listPosts.filter(post => {
        if (post.service == service) {
            posts.push(post);
        }      
      });
      listPosts = posts;
    } 
    listPosts.filter(post => {
      if (listPostDto.createdAt != undefined) {
        if (post.createdAt.toDateString() == listPostDto.createdAt.toDateString()) {
          posts.push(post);
        }
      }      
      if (listPostDto.updatedAt != undefined) {
        if (post.updatedAt.toDateString() == listPostDto.updatedAt.toDateString()) {
          posts.push(post);
        }
      }   
    });

    if ((posts.length == 0) 
    && ((listPostDto.createdAt != undefined)||(listPostDto.updatedAt != undefined))
    ) {
      throw new HttpException("Post not found", HttpStatus.NOT_FOUND);
    } else if (posts.length != 0) {
      listPosts = posts;
    }
    return await listPosts;
  }

  async showPostDetail(refPost: string) {
    const post = await this.postRepository.findOneBy({refPost});
    if (post == null) {
      throw new HttpException("Post not found", HttpStatus.NOT_FOUND)
    }    
    return post;
  }

  async updatePost(refPost: string, updatePostDto: UpdatePostDto) {
    const post = await this.postRepository.findOneBy({refPost});
    if (post == null) {
      throw new HttpException("Post not found", HttpStatus.NOT_FOUND)
    }    
    Object.assign(post, updatePostDto);
    try {
      await this.postRepository.save(post);
    } catch (error) {
      throw new ConflictException(error.driverError.detail);
    }

    return post; 
  }

  async deletePost(refPost: string) {
    const post = await this.postRepository.findOneBy({refPost});
    if (post == null) {
      throw new HttpException("Post not found", HttpStatus.NOT_FOUND);
    }    
    try {
      await this.postRepository.softRemove(post);
    } catch (error) {
      throw new ConflictException(error.driverError.detail);
    }
    return post;
  }
}
