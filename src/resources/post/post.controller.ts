import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, Req } from '@nestjs/common';
import { PostService } from './post.service';
import { PostDto } from './dto/post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { ReferencePipe } from 'src/pipes/reference/reference.pipe';
import { ListPostDto } from './dto/list-post.dto';
import { JwtAuthGuard } from 'src/resources/auth/auth.guard';
import { Request } from 'express';
import { Account } from 'src/decorators/account.decorator';
import { MhouseResponseInterface } from 'src/interfaces/mhouse-response.interface';

@Controller('post')
export class PostController {

  constructor(
    private readonly postService: PostService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async post(
    @Account() user,
    @Body(ReferencePipe) postDto: PostDto
    ): Promise<MhouseResponseInterface> {
      const data = await this.postService.post(postDto, user);
      return {
        data: data,
        message: "Publication effectuée avec succès",
        code:"200"
      }
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async listPost(
    @Query() listPostDto: ListPostDto,
    @Account() account
  ): Promise<MhouseResponseInterface> {
    const data = await this.postService.listPost(listPostDto, account);
    return {
      data: data,
      message: "Liste des publications obtenue avec succès",
      code:"200"
    }
  }

  @Get(':ref')
  @UseGuards(JwtAuthGuard)
  async showPostDetail(
    @Param('ref') ref: string
    ): Promise<MhouseResponseInterface> {
    const data = await this.postService.showPostDetail(ref);
    return {
      data: data,
      message: "Liste des offres obtenue avec succès",
      code:"200"
    };
  }

  // @Patch(':ref')
  // @UseGuards(JwtAuthGuard)
  // async updatePost(
  //   @Param('ref') ref: string, 
  //   @Body() updatePostDto: UpdatePostDto
  //   ): Promise<MhouseResponseInterface> {
  //   return this.postService.updatePost(ref, updatePostDto);
  // }

  // @Delete(':ref')
  // @UseGuards(JwtAuthGuard)
  // async deletePost(
  //   @Param('ref') ref: string
  //   ): Promise<MhouseResponseInterface> {
  //   return await this.postService.deletePost(ref);
  // }
}
