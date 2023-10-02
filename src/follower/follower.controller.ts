import { Controller, Get, Post, Body, Patch, Param, UseGuards, Query } from '@nestjs/common';
import { FollowerService } from './follower.service';
import { FollowDto } from './dto/follow.dto';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { AccountEntity } from 'src/account/entities/account.entity';
import { ListFollowerDto } from './dto/list-follower.dto';
import { ListFollowedDto } from './dto/list-followed.dto';
import { Account } from 'src/decorators/account.decorator';


@Controller('follower')
export class FollowerController {
  constructor(private readonly followerService: FollowerService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async follow(
    @Body() followerDto: FollowDto,
    @Account() user
    ): Promise<AccountEntity> {
    return await this.followerService.follow(followerDto, user);
  }

  // @Patch(':ref')
  // @UseGuards(JwtAuthGuard)
  // async toogleFollow(
  //   @Param('ref') ref: string, 
  //   ): Promise<AccountEntity> {
  //   return await this.followerService.toogleFollow(ref);
  // }

  // @Get()
  // @UseGuards(JwtAuthGuard)
  // async listFollower(
  //   @Query() listFollowerDto: ListFollowerDto
  // ): Promise<AccountEntity[]> {
  //   return await this.followerService.listFollower(listFollowerDto);
  // }

  // @Get()
  // @UseGuards(JwtAuthGuard)
  // async listFollowed(
  //   @Query() listFollowedDto: ListFollowedDto
  // ): Promise<AccountEntity[]> {
  //   return await this.followerService.listFollowed(listFollowedDto);
  // }

  // @Get(':ref')
  // @UseGuards(JwtAuthGuard)
  // async showFollowerDetail(
  //   @Param('ref') ref: string
  //   ): Promise<AccountEntity> {
  //   return await this.followerService.showFollowerDetail(ref);
  // }

}
