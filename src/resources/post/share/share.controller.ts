import { Controller, Get, Post, Body, Param, Query, UseGuards, HttpStatus } from '@nestjs/common';
import { ShareService } from './share.service';
import { ShareDto } from './dto/share.dto';
import { ListShareDto } from './dto/list-share.dto';
import { ReferencePipe } from 'src/pipes/reference/reference.pipe';
import { JwtAuthGuard } from 'src/resources/account/auth/auth.guard';
import { MhouseResponseInterface } from 'src/interfaces/mhouse-response.interface';
import { Account } from 'src/decorators/account.decorator';
import { AccountEntity } from '../../account/entities/account.entity';

@Controller('share')
export class ShareController {

  constructor(
    private readonly shareService: ShareService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async share(
    @Body(ReferencePipe) shareDto: ShareDto,
    @Account() account:AccountEntity
    ): Promise<MhouseResponseInterface> {
    const data = await this.shareService.share(shareDto, account);
    return {
      data: data,
      message: "Partage effectué avec succès",
      code: HttpStatus.OK
    }
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async listShare(
    @Query() listShareDto: ListShareDto,
    @Account() account: AccountEntity
  ): Promise<MhouseResponseInterface> {
    const data = await this.shareService.listShare(listShareDto, account);
    return {
      data: data,
      message: "Liste des partages obtenue avec succès",
      code: HttpStatus.OK
    }
  }

  @Get(':ref')
  @UseGuards(JwtAuthGuard)
  async showShareDetail(
    @Param('ref') ref: string,
    @Account() account: AccountEntity
    ): Promise<MhouseResponseInterface> {
    const data = await this.shareService.showShareDetail(ref, account);
    return {
      data: data,
      message: "Détails du partage obtenus avec succès avec succès",
      code: HttpStatus.OK
    };
  }
}
