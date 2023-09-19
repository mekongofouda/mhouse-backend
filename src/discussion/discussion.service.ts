import { Injectable } from '@nestjs/common';
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

  addDiscussion(addDiscussionDto: AddDiscussionDto) {
    return 'This action adds a new discussion';
  }

  async listDiscussion(listDiscussionDto: ListDiscussionDto): Promise<Discussion[]>  {
    return await this.discussionRepository.find();
  }

  showDiscussionDetail(refDiscussion: string) {
    return `This action returns a #${refDiscussion} discussion`;
  }

  updateDiscussion(refDiscussion: string, updateDiscussionDto: UpdateDiscussionDto) {
    return `This action updates a #${refDiscussion} discussion`;
  }

  deleteDiscussion(refDiscussion: string) {
    return `This action removes a #${refDiscussion} discussion`;
  }
}
