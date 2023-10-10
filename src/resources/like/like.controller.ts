import { Controller, Get, Post, Body, Patch, Param, Query, UseGuards } from '@nestjs/common';
import { LikeService } from './like.service';
import { ListLikeDto } from './dto/list-like.dto';
import { ReferencePipe } from 'src/pipes/reference/reference.pipe';
import { Like } from './entities/like.entity';
import { JwtAuthGuard } from 'src/resources/auth/auth.guard';
import { LikeDto } from './dto/like.dto';
import { MhouseResponseInterface } from 'src/interfaces/mhouse-response.interface';

@Controller('like')
export class LikeController {

  constructor(
    private readonly likeService: LikeService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async like(
    @Body(ReferencePipe) likeDto: LikeDto
    ): Promise<MhouseResponseInterface> {
    const data = await this.likeService.like(likeDto);
    return {
      data: data,
      message: "Liste des likes obtenue avec succès",
      code:"200"
    }
  }

  // @Patch('ref')
  // @UseGuards(JwtAuthGuard)
  // async toogleLike(
  //   @Param('ref') ref: string
  //   ): Promise<Like> {
  //   return await this.likeService.toogleLike(ref);
  // }

  @Get()
  @UseGuards(JwtAuthGuard)
  async listLike(
    @Query() listLikeDto: ListLikeDto
  ): Promise<MhouseResponseInterface> {
    const data = await this.likeService.listLike(listLikeDto);
    return {
      data: data,
      message: "Liste des likes obtenue avec succès",
      code:"200"
    }
  }

  @Get(':ref')
  @UseGuards(JwtAuthGuard)
  async showLikeDetail(
    @Param('ref') ref: string
    ): Promise<MhouseResponseInterface> {
    const data = await this.likeService.showLikeDetail(ref);
    return {
      data: data,
      message: "Liste des likes obtenue avec succès",
      code:"200"
    };
  }

}
