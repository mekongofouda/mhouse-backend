import { Injectable } from '@nestjs/common';
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


  share(shareDto: ShareDto) {
    return 'This action adds a new share';
  }

  async listShare(listShareDto: ListShareDto): Promise<Share[]> {
    return await this.shareRepository.find();
  }

  showShareDetail(refShare: string) {
    return `This action returns a #${refShare} share`;
  }
}
