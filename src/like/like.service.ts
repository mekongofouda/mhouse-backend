import { Injectable } from '@nestjs/common';
import { ToogleLikeDto } from './dto/toogle-like.dto';
import { Like } from './entities/like.entity';
import { ListLikeDto } from './dto/list-like.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class LikeService {

  constructor(
    @InjectRepository(Like) 
    private readonly likeRepository: Repository<Like>
  ){}

  toogleLike(toogleLikeDto: ToogleLikeDto) {
    return 'This action adds a new like';
  }

  async listLike(listLikeDto: ListLikeDto): Promise<Like[]> {
    return await this.likeRepository.find();
  }

  showLikeDetail(refLike: string) {
    return `This action returns a #${refLike} like`;
  }
}
