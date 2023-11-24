import { ConflictException, HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { PostDto } from './dto/post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostEntity } from './entities/post.entity';
import { ListPostDto } from './dto/list-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AccountEntity } from 'src/resources/account/entities/account.entity';
import { Service } from '../service/entities/service.entity';
import { Utils } from 'src/generics/utils';
import { FunctionPrivilegeEnum } from 'src/enums/function.privilege.enum';

@Injectable()
export class PostService extends Utils {

  constructor(

    @InjectRepository(PostEntity) 
    private readonly postRepository: Repository<PostEntity>,

    @InjectRepository(Service) 
    private readonly serviceRepository: Repository<Service>,

    @InjectRepository(AccountEntity) 
    private readonly accountRepository: Repository<AccountEntity>

  ){
    super()
  }

  async post(postDto: PostDto, account: AccountEntity): Promise<PostEntity> {

    const userAccount = await this.accountRepository.findOneBy({refAccount: account.refAccount});
    if(userAccount != null) {
      if (this.IsAuthorised(userAccount, FunctionPrivilegeEnum.ADD_DISCUSSION) == false) {
        throw new UnauthorizedException();
      }
    }

    const post = await this.postRepository.create(postDto);
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

    const userAccount = await this.accountRepository.findOneBy({refAccount: account.refAccount});
    if(userAccount != null) {
      if (this.IsAuthorised(userAccount, FunctionPrivilegeEnum.ADD_DISCUSSION) == false) {
        throw new UnauthorizedException();
      }
    }

    let listPosts: PostEntity[] = [];
    let posts: PostEntity[] = [];

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

  async showPostDetail(refPost: string, account: AccountEntity) {

    const userAccount = await this.accountRepository.findOneBy({refAccount: account.refAccount});
    if(userAccount != null) {
      if (this.IsAuthorised(userAccount, FunctionPrivilegeEnum.ADD_DISCUSSION) == false) {
        throw new UnauthorizedException();
      }
    }

    const post = await this.postRepository.findOneBy({refPost});
    if (post == null) {
      throw new HttpException("Post not found", HttpStatus.NOT_FOUND)
    }   

    return post;

  }

  async updatePost(refPost: string, updatePostDto: UpdatePostDto, account: AccountEntity) {

    const userAccount = await this.accountRepository.findOneBy({refAccount: account.refAccount});
    if(userAccount != null) {
      if (this.IsAuthorised(userAccount, FunctionPrivilegeEnum.ADD_DISCUSSION) == false) {
        throw new UnauthorizedException();
      }
    }

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

  async deletePost(refPost: string, account: AccountEntity) {

    const userAccount = await this.accountRepository.findOneBy({refAccount: account.refAccount});
    if(userAccount != null) {
      if (this.IsAuthorised(userAccount, FunctionPrivilegeEnum.ADD_DISCUSSION) == false) {
        throw new UnauthorizedException();
      }
    }

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
