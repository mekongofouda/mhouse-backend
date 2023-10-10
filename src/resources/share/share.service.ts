import { BadRequestException, ConflictException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ShareDto } from './dto/share.dto';
import { ListShareDto } from './dto/list-share.dto';
import { Share } from './entities/share.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostEntity } from 'src/resources/post/entities/post.entity';

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

  async listShare(listShareDto: ListShareDto): Promise<Share[]> {
    const post = await this.postRepository.findOneBy({refPost: listShareDto.refPost});
    let listShares: Share[] = [];
    if (post == null) {
      throw new HttpException("Post not found", HttpStatus.NOT_FOUND);
    }
    listShares = post.shares;
    return await listShares;
  }

  async showShareDetail(refShare: string) {
    const share = await this.shareRepository.findOneBy({refShare});
    if (share == null) {
      throw new HttpException("Share not found", HttpStatus.NOT_FOUND)
    }    
    return share;
  }
}
