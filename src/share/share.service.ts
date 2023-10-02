import { BadRequestException, ConflictException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ShareDto } from './dto/share.dto';
import { ListShareDto } from './dto/list-share.dto';
import { Share } from './entities/share.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostEntity } from 'src/post/entities/post.entity';

@Injectable()
export class ShareService {

  constructor(
    @InjectRepository(PostEntity) 
    private readonly postRepository: Repository<PostEntity>,

    @InjectRepository(Share) 
    private readonly shareRepository: Repository<Share>
  ){}


  async share(shareDto: ShareDto): Promise<Share>  {
    //Get post to add at the share
    const post = await this.postRepository.findOneBy({refPost: shareDto.refPost});
    if (!post) {
      throw new HttpException("Share not found", HttpStatus.NOT_FOUND)
    }

    //Create the share object with Dto to save it 
    const share = await this.shareRepository.create(shareDto); 
    if (!share) {
      throw new BadRequestException("Hare not found");
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

  // async listShare(listShareDto: ListShareDto): Promise<Share[]> {
  //   const refUser = listShareDto.refUser;
  //   const refPost = listShareDto.refPost;
  //   const createdAt = listShareDto.createdAt;
  //   const updatedAt = listShareDto.updatedAt;

  //   const qb = this.shareRepository.createQueryBuilder("share");

  //   qb.select("share")
  //   if (refUser) {
  //     qb.where("share.refUser = :refUser")
  //     .setParameters({
  //       refUser
  //     })
  //   }
  //   if (refPost) {
  //     qb.andWhere("share.refRole = :refRole")
  //     .setParameters({
  //       refPost
  //     })
  //   }
  //   if (createdAt) {
  //     qb.where("share.createdAt = :createdAt")
  //     .setParameters({
  //       createdAt
  //     })
  //   }
  //   if (updatedAt) {
  //     qb.where("share.updatedAt = :updatedAt")
  //     .setParameters({
  //       updatedAt
  //     })
  //   }
  //   return await qb.getRawMany();
  // }

  // async showShareDetail(refShare: string) {
  //   const share = await this.shareRepository.findOne({where:{refShare}});
  //   if (share == null) {
  //     throw new HttpException("Share not found", HttpStatus.NOT_FOUND)
  //   }    
  //   return share;
  // }
}
