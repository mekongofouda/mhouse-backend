import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { DiscussionService } from './discussion.service';
import { AddDiscussionDto } from './dto/add-discussion.dto';
import { UpdateDiscussionDto } from './dto/update-discussion.dto';
import { ReferencePipe } from 'src/pipes/reference/reference.pipe';
import { ListDiscussionDto } from './dto/list-discussion.dto';
import { Discussion } from './entities/discussion.entity';
import { JwtAuthGuard } from 'src/auth/auth.guard';

@Controller('discussion')
export class DiscussionController {

  constructor(
    private readonly discussionService: DiscussionService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async addDiscussion(
    @Body(ReferencePipe) addDiscussionDto: AddDiscussionDto
    ): Promise<Discussion> {
    return this.discussionService.addDiscussion(addDiscussionDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async listDiscussion(
    @Query() listDiscussionDto: ListDiscussionDto
  ): Promise<Discussion[]> {
    return await this.discussionService.listDiscussion(listDiscussionDto);
  }

  @Get(':ref')
  @UseGuards(JwtAuthGuard)
  async showDiscussionDetail(
    @Param('ref') ref: string
    ): Promise<Discussion> {
    return await this.discussionService.showDiscussionDetail(ref);
  }

  @Patch(':ref')
  @UseGuards(JwtAuthGuard)
  async updateDiscussion(
    @Param('ref') ref: string, 
    @Body() updateDiscussionDto: UpdateDiscussionDto
  ): Promise<Discussion> {
    return await this.discussionService.updateDiscussion(ref, updateDiscussionDto);
  }

  @Delete(':ref')
  @UseGuards(JwtAuthGuard)
  async deleteDiscussion(
    @Param('ref') ref: string
    ): Promise<Discussion> {
    return await this.discussionService.deleteDiscussion(ref);
  }
}
