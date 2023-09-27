import { Controller, Get, Post, Body, Patch, Param, Query, UseGuards } from '@nestjs/common';
import { LikeService } from './like.service';
import { ListLikeDto } from './dto/list-like.dto';
import { ReferencePipe } from 'src/pipes/reference/reference.pipe';
import { Like } from './entities/like.entity';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { LikeDto } from './dto/like.dto';

@Controller('like')
export class LikeController {

  constructor(
    private readonly likeService: LikeService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async like(
    @Body(ReferencePipe) likeDto: LikeDto
    ): Promise<Like> {
    return await this.likeService.like(likeDto);
  }

  @Patch('ref')
  @UseGuards(JwtAuthGuard)
  async toogleLike(
    @Param('ref') ref: string
    ): Promise<Like> {
    return await this.likeService.toogleLike(ref);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async listLike(
    @Query() listLikeDto: ListLikeDto
  ): Promise<Like[]> {
    return await this.likeService.listLike(listLikeDto);
  }

  @Get(':ref')
  @UseGuards(JwtAuthGuard)
  async showLikeDetail(
    @Param('ref') ref: string
    ): Promise<Like> {
    return await this.likeService.showLikeDetail(ref);
  }

}
