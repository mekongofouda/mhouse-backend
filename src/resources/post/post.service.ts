import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
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
import { NotificationService } from 'src/resources/notification/notification.service';

@Injectable()
export class PostService extends Utils {
  constructor(
    @InjectRepository(PostEntity)
    private readonly postRepository: Repository<PostEntity>,

    @InjectRepository(Service)
    private readonly serviceRepository: Repository<Service>,

    @InjectRepository(AccountEntity)
    private readonly accountRepository: Repository<AccountEntity>,
    private readonly notificationService: NotificationService,
  ) {
    super();
  }

  async post(postDto: PostDto, account: AccountEntity): Promise<PostEntity> {
    const userAccount = await this.accountRepository.findOneBy({
      refAccount: account.refAccount,
    });
    if (userAccount != null) {
      if (this.IsAuthorised(userAccount, FunctionPrivilegeEnum.POST) == false) {
        throw new UnauthorizedException();
      }
    }

    const post = await this.postRepository.create(postDto);
    post.account = userAccount;

    try {
      await this.postRepository.save(post);
    } catch (error) {
      throw new ConflictException(error.driverError.detail);
    }
    await this.notificationService.sendNotification(account);

    return post;
  }

  async uploadPostImage(account, file) {
    const userAccount = await this.accountRepository.findOneBy({
      refAccount: account.refAccount,
    });
    if (userAccount != null) {
      if (
        this.IsAuthorised(userAccount, FunctionPrivilegeEnum.UPLOAD_POST_IMAGE) !=
        false
      ) {
        throw new UnauthorizedException("Vous n'avez pas les privilèges requis");
      }
    }
    userAccount.avatar = file;
    console.log(userAccount);

    //Persist account
    try {
      await this.accountRepository.save(userAccount);
    } catch (error) {
      throw new ConflictException(error.driverError.detail); 
    }

    return userAccount;
  }

  async listPost(
    listPostDto: ListPostDto,
    account: any,
  ): Promise<PostEntity[]> {
    const userAccount = await this.accountRepository.findOneBy({
      refAccount: account.refAccount,
    });
    if (userAccount != null) {
      if (
        this.IsAuthorised(userAccount, FunctionPrivilegeEnum.LIST_POST) == false
      ) {
        throw new UnauthorizedException();
      }
    }

    let listPosts: PostEntity[] = [];
    const posts: PostEntity[] = [];

    if (listPostDto.refAccount != undefined) {
      const userAccount = await this.accountRepository.findOneBy({
        refAccount: listPostDto.refAccount,
      });
      if (userAccount == null) {
        throw new HttpException('Account not found', HttpStatus.NOT_FOUND);
      }
      listPosts = userAccount.posts;
    } else if (listPostDto.all == 1) {
      listPosts = await this.postRepository.find();
    } else {
      listPosts = account.posts;
    }

    
    listPosts.filter((post) => {
      if (listPostDto.createdAt != undefined) {
        if (
          post.createdAt.toDateString() == listPostDto.createdAt.toDateString()
        ) {
          posts.push(post);
        }
      }
      if (listPostDto.updatedAt != undefined) {
        if (
          post.updatedAt.toDateString() == listPostDto.updatedAt.toDateString()
        ) {
          posts.push(post);
        }
      }
    });

    if (
      posts.length == 0 &&
      (listPostDto.createdAt != undefined || listPostDto.updatedAt != undefined)
    ) {
      throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    } else if (posts.length != 0) {
      listPosts = posts;
    }
    return await listPosts;
  }

  async showPostDetail(refPost: string, account: AccountEntity) {
    const userAccount = await this.accountRepository.findOneBy({
      refAccount: account.refAccount,
    });
    if (userAccount != null) {
      if (
        this.IsAuthorised(userAccount, FunctionPrivilegeEnum.SHOW_POST) == false
      ) {
        throw new UnauthorizedException();
      }
    }

    const post = await this.postRepository.findOneBy({ refPost });
    if (post == null) {
      throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    }

    return post;
  }

  async updatePost(
    refPost: string,
    updatePostDto: UpdatePostDto,
    account: AccountEntity,
  ) {
    const userAccount = await this.accountRepository.findOneBy({
      refAccount: account.refAccount,
    });
    if (userAccount != null) {
      if (
        this.IsAuthorised(userAccount, FunctionPrivilegeEnum.UPDATE_POST) ==
        false
      ) {
        throw new UnauthorizedException();
      }
    }

    const post = await this.postRepository.findOneBy({ refPost });
    if (post == null) {
      throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
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
    const userAccount = await this.accountRepository.findOneBy({
      refAccount: account.refAccount,
    });
    if (userAccount != null) {
      if (
        this.IsAuthorised(userAccount, FunctionPrivilegeEnum.DELETE_POST) ==
        false
      ) {
        throw new UnauthorizedException();
      }
    }

    const post = await this.postRepository.findOneBy({ refPost });
    if (post == null) {
      throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    }

    try {
      await this.postRepository.softRemove(post);
    } catch (error) {
      throw new ConflictException(error.driverError.detail);
    }
    await this.notificationService.sendNotification(account);

    return post;
  }
}
