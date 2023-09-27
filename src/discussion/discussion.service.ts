import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AddDiscussionDto } from './dto/add-discussion.dto';
import { UpdateDiscussionDto } from './dto/update-discussion.dto';
import { ListDiscussionDto } from './dto/list-discussion.dto';
import { Discussion } from './entities/discussion.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class DiscussionService {

  constructor(
    @InjectRepository(Discussion) 
    private readonly discussionRepository: Repository<Discussion>
  ){}

  async addDiscussion(addDiscussionDto: AddDiscussionDto) {
    return await this.discussionRepository.save(addDiscussionDto);
  }

  async listDiscussion(listDiscussionDto: ListDiscussionDto): Promise<Discussion[]>  {
    const refUser = listDiscussionDto.refUser;
    const createdAt = listDiscussionDto.createdAt;
    const updatedAt = listDiscussionDto.updatedAt;

    const qb = this.discussionRepository.createQueryBuilder("discussion");

    qb.select("discussion")
    if (refUser) {
      qb.where("discussion.refUser = :refUser")
      .setParameters({
        refUser
      })
    }
    if (createdAt) {
      qb.where("discussion.createdAt = :createdAt")
      .setParameters({
        createdAt
      })
    }
    if (updatedAt) {
      qb.where("discussion.updatedAt = :updatedAt")
      .setParameters({
        updatedAt
      })
    }
    return await qb.getRawMany();
  }

  async showDiscussionDetail(refDiscussion: string) {
    const discussion = await this.discussionRepository.findOne({where:{refDiscussion}});
    if (discussion == null) {
      throw new HttpException("Discussion not found", HttpStatus.NOT_FOUND)
    }    
    return discussion;
  }

  async updateDiscussion(refDiscussion: string, updateDiscussionDto: UpdateDiscussionDto) {
    const discussion = await this.discussionRepository.findOne({where:{refDiscussion}});
    if (discussion == null) {
      throw new HttpException("Discussion not found", HttpStatus.NOT_FOUND)
    }    
    Object.assign(discussion, updateDiscussionDto);
    return await this.discussionRepository.save(discussion);
  }

  async deleteDiscussion(refDiscussion: string) {
    const discussion = await this.discussionRepository.findOneBy({refDiscussion});
    if (discussion == null) {
      throw new HttpException("Discussion not found", HttpStatus.NOT_FOUND)
    }    
    return await this.discussionRepository.softRemove(discussion);
  }
}
