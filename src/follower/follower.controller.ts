import { Controller, Get, Post, Body, Patch, Param, UseGuards, Query } from '@nestjs/common';
import { FollowerService } from './follower.service';
import { FollowDto } from './dto/follow.dto';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { Account } from 'src/account/entities/account.entity';
import { ListFollowerDto } from './dto/list-follower.dto';
import { ListFollowedDto } from './dto/list-followed.dto';

@Controller('follower')
export class FollowerController {
  constructor(private readonly followerService: FollowerService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async follow(
    @Body() followerDto: FollowDto
    ): Promise<Account> {
    return await this.followerService.follow(followerDto);
  }

  @Patch(':ref')
  @UseGuards(JwtAuthGuard)
  async toogleFollow(
    @Param('ref') ref: string, 
    ): Promise<Account> {
    return await this.followerService.toogleFollow(ref);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async listFollower(
    @Query() listFollowerDto: ListFollowerDto
  ): Promise<Account[]> {
    return await this.followerService.listFollower(listFollowerDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async listFollowed(
    @Query() listFollowedDto: ListFollowedDto
  ): Promise<Account[]> {
    return await this.followerService.listFollowed(listFollowedDto);
  }

  @Get(':ref')
  @UseGuards(JwtAuthGuard)
  async showFollowerDetail(
    @Param('ref') ref: string
    ): Promise<Account> {
    return await this.followerService.showFollowerDetail(ref);
  }

}
