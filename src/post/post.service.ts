import { Injectable } from '@nestjs/common';
import { PostDto } from './dto/post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { ToogleActivatePostDto } from './dto/toogle-activate-post.dto';
import { Post } from './entities/post.entity';
import { ListPostDto } from './dto/list-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PostService {

  constructor(
    @InjectRepository(Post) 
    private readonly postRepository: Repository<Post>
  ){}

  post(postDto: PostDto) {
    return 'This action adds a new post';
  }

  toogleActivatePost(refPost: string, toogleActivatePostDto: ToogleActivatePostDto) {
    return `This action updates a #${refPost} post`;
  }

  async listPost(listPostDto: ListPostDto): Promise<Post[]>{
    return await this.postRepository.find();
  }

  showPostDetail(refPost: string) {
    return `This action returns a #${refPost} post`;
  }

  updatePost(refPost: string, updatePostDto: UpdatePostDto) {
    return `This action updates a #${refPost} post`;
  }

  deletePost(refPost: string) {
    return `This action removes a #${refPost} post`;
  }
}
