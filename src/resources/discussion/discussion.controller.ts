import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { DiscussionService } from './discussion.service';
import { AddDiscussionDto } from './dto/add-discussion.dto';
import { UpdateDiscussionDto } from './dto/update-discussion.dto';
import { ReferencePipe } from 'src/pipes/reference/reference.pipe';
import { ListDiscussionDto } from './dto/list-discussion.dto';
import { JwtAuthGuard } from 'src/resources/auth/auth.guard';
import { Account } from 'src/decorators/account.decorator';
import { MhouseResponseInterface } from 'src/interfaces/mhouse-response.interface';

@Controller('discussion')
export class DiscussionController {

  constructor(
    private readonly discussionService: DiscussionService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async addDiscussion(
    @Body(ReferencePipe) addDiscussionDto: AddDiscussionDto,
    @Account() account
    ): Promise<MhouseResponseInterface> {
    const data = this.discussionService.addDiscussion(addDiscussionDto, account);
    return {
      data: data,
      message: "Discussion créée avec succès",
      code:"200"
    }
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async listDiscussion(
    @Query() listDiscussionDto: ListDiscussionDto,
    @Account() account
  ): Promise<MhouseResponseInterface> {
    const data = await this.discussionService.listDiscussion(listDiscussionDto, account);
    return {
      data: data,
      message: "Liste des discussions obtenue avec succès",
      code:"200"
    }
  }

  @Get(':ref')
  @UseGuards(JwtAuthGuard)
  async showDiscussionDetail(
    @Param('ref') ref: string
  ): Promise<MhouseResponseInterface> {
    const data = await this.discussionService.showDiscussionDetail(ref);
    return {
      data: data,
      message: "Liste des discussions obtenue avec succès",
      code:"200"
    };
  }

  // @Patch(':ref')
  // @UseGuards(JwtAuthGuard)
  // async updateDiscussion(
  //   @Param('ref') ref: string, 
  //   @Body() updateDiscussionDto: UpdateDiscussionDto
  // ): Promise<MhouseResponseInterface> {
  //   return await this.discussionService.updateDiscussion(ref, updateDiscussionDto);
  // }

  // @Delete(':ref')
  // @UseGuards(JwtAuthGuard)
  // async deleteDiscussion(
  //   @Param('ref') ref: string,
  //   @Account() user
  // ): Promise<MhouseResponseInterface> {
  //   return await this.discussionService.deleteDiscussion(ref);
  // }
}
