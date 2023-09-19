import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, Query } from '@nestjs/common';
import { PostService } from './post.service';
import { PostDto } from './dto/post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { ReferencePipe } from 'src/pipes/reference/reference.pipe';
import { ListPostDto } from './dto/list-post.dto';
import { ToogleActivatePostDto } from './dto/toogle-activate-post.dto';
import { DatePipe } from 'src/pipes/date/date.pipe';

@Controller('post')
export class PostController {

  constructor(
    private readonly postService: PostService,
  ) {}

  @Post()
  post(
    @Body(ReferencePipe, DatePipe) postDto: PostDto
    ) {
    return this.postService.post(postDto);
  }

  @Patch(':ref')
  toogleActivatePost(
    @Param('ref') ref: string, 
    @Body() toogleActivatePostDto: ToogleActivatePostDto
  ) {
    return this.postService.toogleActivatePost(ref, toogleActivatePostDto);
  }

  @Get()
  listPost(
    @Query() listPostDto: ListPostDto
  ) {
    if (!this.postService.listPost(listPostDto)) {
      throw new HttpException("Post not found", HttpStatus.NOT_FOUND)
    }
    return this.postService.listPost(listPostDto);
  }

  @Get(':ref')
  showPostDetail(
    @Param('ref') ref: string
    ) {
    if (!this.postService.showPostDetail(ref)) {
      throw new HttpException("Post not found", HttpStatus.NOT_FOUND)
    }
    return this.postService.showPostDetail(ref);
  }

  @Patch(':ref')
  updatePost(
    @Param('ref') ref: string, 
    @Body() updatePostDto: UpdatePostDto
  ) {
    return this.postService.updatePost(ref, updatePostDto);
  }

  @Delete(':ref')
  deletePost(
    @Param('ref') ref: string
    ) {
    return this.postService.deletePost(ref);
  }
}
