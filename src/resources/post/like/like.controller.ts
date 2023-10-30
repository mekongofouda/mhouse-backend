import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Patch, 
  Param, 
  Query, 
  UseGuards, 
  HttpStatus 
} from '@nestjs/common';
import { LikeService } from './like.service';
import { ListLikeDto } from './dto/list-like.dto';
import { ReferencePipe } from 'src/pipes/reference/reference.pipe';
import { JwtAuthGuard } from 'src/resources/account/auth/auth.guard';
import { MhouseResponseInterface } from 'src/interfaces/mhouse-response.interface';
import { Account } from 'src/decorators/account.decorator';
import { AccountEntity } from '../../account/entities/account.entity';
import { LikeDto } from './dto/like.dto';

@Controller('like')
export class LikeController {

  constructor(
    private readonly likeService: LikeService,
  ) {}


  @Post()
  @UseGuards(JwtAuthGuard)
  async like(
    @Body(ReferencePipe) likeDto: LikeDto,
    @Account() account:AccountEntity
    ): Promise<MhouseResponseInterface> {
    const data = await this.likeService.like(likeDto, account);
    return {
      data: data,
      message: "Liste des likes obtenue avec succès",
      code: HttpStatus.OK
    };
  }

  @Patch(':ref')
  @UseGuards(JwtAuthGuard)
  async unlike(
    @Param('ref') refLike: string
    ): Promise<MhouseResponseInterface> {
    const data = await this.likeService.unlike(refLike);
    return {
      data: data,
      message: "Liste des likes obtenue avec succès",
      code: HttpStatus.OK
    };
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async listLike(
    @Query() listLikeDto: ListLikeDto,
    @Account() account: AccountEntity
  ): Promise<MhouseResponseInterface> {
    const data = await this.likeService.listLike(listLikeDto, account);
    return {
      data: data,
      message: "Liste des likes obtenue avec succès",
      code: HttpStatus.OK
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
      code: HttpStatus.OK
    };
  }

}
