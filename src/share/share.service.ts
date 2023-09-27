import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ShareDto } from './dto/share.dto';
import { ListShareDto } from './dto/list-share.dto';
import { Share } from './entities/share.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ShareService {

  constructor(
    @InjectRepository(Share) 
    private readonly shareRepository: Repository<Share>
  ){}


  async share(shareDto: ShareDto): Promise<Share>  {
    return await this.shareRepository.save(shareDto);
  }

  async listShare(listShareDto: ListShareDto): Promise<Share[]> {
    const refUser = listShareDto.refUser;
    const refPost = listShareDto.refPost;
    const createdAt = listShareDto.createdAt;
    const updatedAt = listShareDto.updatedAt;

    const qb = this.shareRepository.createQueryBuilder("share");

    qb.select("share")
    if (refUser) {
      qb.where("share.refUser = :refUser")
      .setParameters({
        refUser
      })
    }
    if (refPost) {
      qb.andWhere("share.refRole = :refRole")
      .setParameters({
        refPost
      })
    }
    if (createdAt) {
      qb.where("share.createdAt = :createdAt")
      .setParameters({
        createdAt
      })
    }
    if (updatedAt) {
      qb.where("share.updatedAt = :updatedAt")
      .setParameters({
        updatedAt
      })
    }
    return await qb.getRawMany();
  }

  async showShareDetail(refShare: string) {
    const share = await this.shareRepository.findOne({where:{refShare}});
    console.log(share);
    if (share == null) {
      throw new HttpException("Share not found", HttpStatus.NOT_FOUND)
    }    
    return share;
  }
}
