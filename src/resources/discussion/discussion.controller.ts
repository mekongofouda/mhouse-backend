import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Patch, 
  Param, 
  Delete, 
  Query, 
  UseGuards, 
  HttpStatus 
} from '@nestjs/common';
import { DiscussionService } from './discussion.service';
import { AddDiscussionDto } from './dto/add-discussion.dto';
import { UpdateDiscussionDto } from './dto/update-discussion.dto';
import { ReferencePipe } from 'src/pipes/reference/reference.pipe';
import { ListDiscussionDto } from './dto/list-discussion.dto';
import { JwtAuthGuard } from 'src/resources/account/auth/auth.guard';
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
    const data = await this.discussionService.addDiscussion(addDiscussionDto, account);
    return {
      data: data,
      message: "Discussion créée avec succès",
      code: HttpStatus.OK
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
      code: HttpStatus.OK
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
      code: HttpStatus.OK
    };
  }

  @Patch(':ref')
  @UseGuards(JwtAuthGuard)
  async updateDiscussion(
    @Param('ref') ref: string, 
    @Body() updateDiscussionDto: UpdateDiscussionDto
  ): Promise<MhouseResponseInterface> {
    const data = await this.discussionService.updateDiscussion(ref, updateDiscussionDto);
    return {
      data: data,
      message: "Discussion mise à jour avec succès",
      code: HttpStatus.OK
    };
  }

  @Delete(':ref')
  @UseGuards(JwtAuthGuard)
  async deleteDiscussion(
    @Param('ref') ref: string,
  ): Promise<MhouseResponseInterface> {
    const data = await this.discussionService.deleteDiscussion(ref);
    return {
      data: data,
      message: "Discussion supprimée avec succès",
      code: HttpStatus.OK
    };
  }
}
