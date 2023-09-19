import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, HttpException, Query } from '@nestjs/common';
import { DiscussionService } from './discussion.service';
import { AddDiscussionDto } from './dto/add-discussion.dto';
import { UpdateDiscussionDto } from './dto/update-discussion.dto';
import { ReferencePipe } from 'src/pipes/reference/reference.pipe';
import { ListDiscussionDto } from './dto/list-discussion.dto';
import { DatePipe } from 'src/pipes/date/date.pipe';

@Controller('discussion')
export class DiscussionController {

  constructor(
    private readonly discussionService: DiscussionService,
  ) {}

  @Post()
  addDiscussion(
    @Body(ReferencePipe, DatePipe) addDiscussionDto: AddDiscussionDto
    ) {
    return this.discussionService.addDiscussion(addDiscussionDto);
  }

  @Get()
  listDiscussion(
    @Query() listDiscussionDto: ListDiscussionDto
  ) {
    if (!this.discussionService.listDiscussion(listDiscussionDto)) {
      throw new HttpException("Discussion not found", HttpStatus.NOT_FOUND)
    }
    return this.discussionService.listDiscussion(listDiscussionDto);
  }

  @Get(':ref')
  showDiscussionDetail(
    @Param('ref') ref: string
    ) {
    if (!this.discussionService.showDiscussionDetail(ref)) {
      throw new HttpException("Discussion not found", HttpStatus.NOT_FOUND)
    }
    return this.discussionService.showDiscussionDetail(ref);
  }

  @Patch(':ref')
  updateDiscussion(
    @Param('ref') ref: string, 
    @Body() updateDiscussionDto: UpdateDiscussionDto
  ) {
    return this.discussionService.updateDiscussion(ref, updateDiscussionDto);
  }

  @Delete(':ref')
  deleteDiscussion(
    @Param('ref') ref: string
    ) {
    return this.discussionService.deleteDiscussion(ref);
  }
}
