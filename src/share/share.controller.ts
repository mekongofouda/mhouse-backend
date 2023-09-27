import { Controller, Get, Post, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ShareService } from './share.service';
import { ShareDto } from './dto/share.dto';
import { ListShareDto } from './dto/list-share.dto';
import { ReferencePipe } from 'src/pipes/reference/reference.pipe';
import { Share } from './entities/share.entity';
import { JwtAuthGuard } from 'src/auth/auth.guard';

@Controller('share')
export class ShareController {

  constructor(
    private readonly shareService: ShareService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async share(
    @Body(ReferencePipe) shareDto: ShareDto
    ): Promise<Share> {
    return await this.shareService.share(shareDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async listShare(
    @Query() listShareDto: ListShareDto
  ): Promise<Share[]> {
    return await this.shareService.listShare(listShareDto);
  }

  @Get(':ref')
  @UseGuards(JwtAuthGuard)
  async showShareDetail(
    @Param('ref') ref: string
    ) {
    return await this.shareService.showShareDetail(ref);
  }
}
