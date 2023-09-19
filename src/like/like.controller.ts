import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, Query } from '@nestjs/common';
import { LikeService } from './like.service';
import { ToogleLikeDto } from './dto/toogle-like.dto';
import { ListLikeDto } from './dto/list-like.dto';
import { ReferencePipe } from 'src/pipes/reference/reference.pipe';
import { DatePipe } from 'src/pipes/date/date.pipe';

@Controller('like')
export class LikeController {

  constructor(
    private readonly likeService: LikeService,
  ) {}

  @Post()
  toogleLike(
    @Body(ReferencePipe, DatePipe) toogleLikeDto: ToogleLikeDto
    ) {
    return this.likeService.toogleLike(toogleLikeDto);
  }

  @Get()
  listLike(
    @Query() listLikeDto: ListLikeDto
  ) {
    if (!this.likeService.listLike(listLikeDto)) {
      throw new HttpException("Like not found", HttpStatus.NOT_FOUND)
    }
    return this.likeService.listLike(listLikeDto);
  }

  @Get(':ref')
  showLikeDetail(
    @Param('ref') ref: string
    ) {
    if (!this.likeService.showLikeDetail(ref)) {
      throw new HttpException("Like not found", HttpStatus.NOT_FOUND)
    }
    return this.likeService.showLikeDetail(ref);
  }

}
