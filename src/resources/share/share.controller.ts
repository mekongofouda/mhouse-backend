import { Controller, Get, Post, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ShareService } from './share.service';
import { ShareDto } from './dto/share.dto';
import { ListShareDto } from './dto/list-share.dto';
import { ReferencePipe } from 'src/pipes/reference/reference.pipe';
import { JwtAuthGuard } from 'src/resources/auth/auth.guard';
import { MhouseResponseInterface } from 'src/interfaces/mhouse-response.interface';

@Controller('share')
export class ShareController {

  constructor(
    private readonly shareService: ShareService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async share(
    @Body(ReferencePipe) shareDto: ShareDto
    ): Promise<MhouseResponseInterface> {
    const data = await this.shareService.share(shareDto);
    return {
      data: data,
      message: "Partage effectué avec succès",
      code:"200"
    }
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async listShare(
    @Query() listShareDto: ListShareDto
  ): Promise<MhouseResponseInterface> {
    const data = await this.shareService.listShare(listShareDto);
    return {
      data: data,
      message: "Partage effectué avec succès",
      code:"200"
    }
  }

  @Get(':ref')
  @UseGuards(JwtAuthGuard)
  async showShareDetail(
    @Param('ref') ref: string
    ): Promise<MhouseResponseInterface> {
    const data = await this.shareService.showShareDetail(ref);
    return {
      data: data,
      message: "Partage effectué avec succès",
      code:"200"
    };
  }
}
