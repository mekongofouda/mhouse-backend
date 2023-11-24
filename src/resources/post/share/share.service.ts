import { BadRequestException, ConflictException, HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { ShareDto } from './dto/share.dto';
import { ListShareDto } from './dto/list-share.dto';
import { Share } from './entities/share.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostEntity } from 'src/resources/post/entities/post.entity';
import { AccountEntity } from '../../account/entities/account.entity';
import { FunctionPrivilegeEnum } from 'src/enums/function.privilege.enum';
import { Utils } from 'src/generics/utils';

@Injectable()
export class ShareService extends Utils {

  constructor(

    @InjectRepository(AccountEntity) 
    private readonly accountRepository: Repository<AccountEntity>,

    @InjectRepository(PostEntity) 
    private readonly postRepository: Repository<PostEntity>,

    @InjectRepository(Share) 
    private readonly shareRepository: Repository<Share>

  ){
    super()
  }


  async share(shareDto: ShareDto, account: any): Promise<Share>  {

    const userAccount = await this.accountRepository.findOneBy({refAccount: account.refAccount});
    if(userAccount != null) {
      if (this.IsAuthorised(userAccount, FunctionPrivilegeEnum.ADD_DISCUSSION) == false) {
        throw new UnauthorizedException();
      }
    }
    if (userAccount == null) {
      throw new HttpException("Account not found", HttpStatus.NOT_FOUND)
    }

    const post = await this.postRepository.findOneBy({refPost: shareDto.refPost});
    if (post == null) {
      throw new HttpException("Post not found", HttpStatus.NOT_FOUND)
    }

    const share = await this.shareRepository.create(shareDto); 
    if (share == null) {
      throw new BadRequestException("SHare not found");
    }
    share.post = post;
    share.account = userAccount;

    try {
      await this.shareRepository.save(share);
    } catch (error) {
      throw new ConflictException("L'email et le numéro de téléphone doivent être déjà utilisés");
    }

    return share;
  }

  async listShare(listShareDto: ListShareDto, account: any): Promise<Share[]> {

    const userAccount = await this.accountRepository.findOneBy({refAccount: account.refAccount});
    if(userAccount != null) {
      if (this.IsAuthorised(userAccount, FunctionPrivilegeEnum.ADD_DISCUSSION) == false) {
        throw new UnauthorizedException();
      }
    }

    let listShares: Share[] = [];
    let shares: Share[] = [];

    if (listShareDto.refAccount != undefined) {
      const userAccount = await this.accountRepository.findOneBy({refAccount: listShareDto.refAccount});
      if (userAccount == null) {
        throw new HttpException("Account not found", HttpStatus.NOT_FOUND);
      } 
      listShares = userAccount.shares;
    } else if (listShareDto.all == 1){
      listShares = await this.shareRepository.find();
    } else {
      console.log(account);
      listShares = account.shares;
    }

    if (listShareDto.refPost != undefined) {
      const post = await this.postRepository.findOneBy({refPost: listShareDto.refPost});
      if (post == null) {
        throw new HttpException("Post not found", HttpStatus.NOT_FOUND);
      } 
      shares = post.shares;
      listShares = post.shares;
    } 

    listShares.filter(share => {
      if (listShareDto.createdAt != undefined) {
        if (share.createdAt.toDateString() == listShareDto.createdAt.toDateString()) {
          if (!shares.includes(share)) {
            shares.push(share);
          }
        }
      }      
      if (listShareDto.updatedAt != undefined) {
        if (share.updatedAt.toDateString() == listShareDto.updatedAt.toDateString()) {
          if (!shares.includes(share)) {
            shares.push(share);
          }
        }
      }   
    });

    if ((shares.length == 0) 
    && ((listShareDto.createdAt != undefined)
    ||(listShareDto.updatedAt != undefined)
    )) {
      throw new HttpException("Share not found", HttpStatus.NOT_FOUND);
    } else if (shares.length != 0) {
      listShares = shares;
    }

    return listShares;

  }

  async showShareDetail(refShare: string, account: AccountEntity) {
    
    const userAccount = await this.accountRepository.findOneBy({refAccount: account.refAccount});
    if(userAccount != null) {
      if (this.IsAuthorised(userAccount, FunctionPrivilegeEnum.ADD_DISCUSSION) == false) {
        throw new UnauthorizedException();
      }
    }

    const share = await this.shareRepository.findOneBy({refShare});
    if (share == null) {
      throw new HttpException("Share not found", HttpStatus.NOT_FOUND)
    }    
    return share;
  }
}
