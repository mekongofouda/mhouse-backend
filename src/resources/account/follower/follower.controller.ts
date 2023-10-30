import { Controller, Get, Post, Body, Patch, Param, UseGuards, Query, HttpStatus } from '@nestjs/common';
import { FollowerService } from './follower.service';
import { FollowDto } from './dto/follow.dto';
import { JwtAuthGuard } from 'src/resources/account/auth/auth.guard';
import { ListFollowerDto } from './dto/list-follower.dto';
import { ListFollowedDto } from './dto/list-followed.dto';
import { Account } from 'src/decorators/account.decorator';
import { MhouseResponseInterface } from 'src/interfaces/mhouse-response.interface';
import { AccountEntity } from '../entities/account.entity';


@Controller('follower')
export class FollowerController {
  constructor(private readonly followerService: FollowerService) {}


  @Patch(':ref')
  @UseGuards(JwtAuthGuard)
  async follow(
    @Param('ref') ref: string, 
    @Account() account
  ): Promise<MhouseResponseInterface> {
    const data = await this.followerService.follow(ref, account);
    return {
      data: data,
      message: "Utilisateur non suivi !",
      code: HttpStatus.OK
    }
  }

  @Patch(':ref')
  @UseGuards(JwtAuthGuard)
  async notFollow(
    @Param('ref') ref: string, 
    @Account() account
  ): Promise<MhouseResponseInterface> {
    const data = await this.followerService.notFollow(ref, account);
    return {
      data: data,
      message: "Utilisateur non suivi !",
      code: HttpStatus.OK
    }
  }

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
      code: HttpStatus.OK
    }
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async listFollowed(
    @Query() listFollowedDto: ListFollowedDto,
    @Account() account: AccountEntity
  ): Promise<MhouseResponseInterface> {
    const data = await this.followerService.listFollowed(listFollowedDto, account);
    return {
      data: data,
      message: "Liste des followers obtenue avec succès",
      code: HttpStatus.OK
    };
  }

  @Get(':ref')
  @UseGuards(JwtAuthGuard)
  async showFollowerDetail(
    @Param('ref') ref: string
  ): Promise<MhouseResponseInterface> {
    const data = await this.followerService.showFollowerDetail(ref);
    return {
      data: data,
      message: "Liste des followers obtenue avec succès",
      code: HttpStatus.OK
    };
  }

}
