import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, Req, HttpStatus } from '@nestjs/common';
import { PostService } from './post.service';
import { PostDto } from './dto/post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { ReferencePipe } from 'src/pipes/reference/reference.pipe';
import { ListPostDto } from './dto/list-post.dto';
import { JwtAuthGuard } from 'src/resources/account/auth/auth.guard';
import { Account } from 'src/decorators/account.decorator';
import { MhouseResponseInterface } from 'src/interfaces/mhouse-response.interface';
import { AccountEntity } from '../account/entities/account.entity';

@Controller('post')
export class PostController {

  constructor(
    private readonly postService: PostService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async post(
    @Account() account,
    @Body(ReferencePipe) postDto: PostDto
    ): Promise<MhouseResponseInterface> {
      const data = await this.postService.post(postDto, account);
      return {
        data: data,
        message: "Publication effectuée avec succès",
        code: HttpStatus.OK
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
      code: HttpStatus.OK
    }
  }

  @Get(':ref')
  @UseGuards(JwtAuthGuard)
  async showPostDetail(
    @Param('ref') ref: string,
    @Account() account: AccountEntity
    ): Promise<MhouseResponseInterface> {
    const data = await this.postService.showPostDetail(ref, account);
    return {
      data: data,
      message: "Détails de la publication obtenues avec succès",
      code: HttpStatus.OK
    };
  }

  @Patch(':ref')
  @UseGuards(JwtAuthGuard)
  async updatePost(
    @Param('ref') ref: string, 
    @Body() updatePostDto: UpdatePostDto,
    @Account() account: AccountEntity
    ): Promise<MhouseResponseInterface> {
    const data = await this.postService.updatePost(ref, updatePostDto, account);
    return {
      data: data,
      message: "Mise à jour de la publication effectuée avec succès",
      code: HttpStatus.OK
    };
  }

  @Delete(':ref')
  @UseGuards(JwtAuthGuard)
  async deletePost(
    @Param('ref') ref: string,
    @Account() account: AccountEntity
    ): Promise<MhouseResponseInterface> {
    const data = await this.postService.deletePost(ref, account);
    return {
      data: data,
      message: "Publication supprimée avec succès",
      code: HttpStatus.OK
    };
  }
}
