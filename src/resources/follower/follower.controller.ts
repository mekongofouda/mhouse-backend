import { Controller, Get, Post, Body, Patch, Param, UseGuards, Query } from '@nestjs/common';
import { FollowerService } from './follower.service';
import { FollowDto } from './dto/follow.dto';
import { JwtAuthGuard } from 'src/resources/auth/auth.guard';
import { ListFollowerDto } from './dto/list-follower.dto';
import { ListFollowedDto } from './dto/list-followed.dto';
import { Account } from 'src/decorators/account.decorator';
import { MhouseResponseInterface } from 'src/interfaces/mhouse-response.interface';


@Controller('follower')
export class FollowerController {
  constructor(private readonly followerService: FollowerService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async follow(
    @Body() followerDto: FollowDto,
    @Account() user
    ): Promise<MhouseResponseInterface> {
      const data = await this.followerService.follow(followerDto, user);
    return {
      data: data,
      message: "Follow effectué avec succès",
      code:"200"
    }
  }

  // @Patch(':ref')
  // @UseGuards(JwtAuthGuard)
  // async toogleFollow(
  //   @Param('ref') ref: string, 
  // ): Promise<MhouseResponseInterface> {
  //   return await this.followerService.toogleFollow(ref);
  // }

  @Get()
  @UseGuards(JwtAuthGuard)
  async listFollower(
    @Query() listFollowerDto: ListFollowerDto,
    @Account() account
  ): Promise<MhouseResponseInterface> {
    const data = await this.followerService.listFollower(listFollowerDto, account);
    return {
      data: data,
      message: "Liste des followers obtenue avec succès",
      code:"200"
    }
  }

  // @Get()
  // @UseGuards(JwtAuthGuard)
  // async listFollowed(
  //   @Query() listFollowedDto: ListFollowedDto
  // ): Promise<MhouseResponseInterface> {
  //   return await this.followerService.listFollowed(listFollowedDto);
  // }

  // @Get(':ref')
  // @UseGuards(JwtAuthGuard)
  // async showFollowerDetail(
  //   @Param('ref') ref: string
  // ): Promise<MhouseResponseInterface> {
  //   return await this.followerService.showFollowerDetail(ref);
  // }

}
