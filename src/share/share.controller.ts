import { Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpStatus, HttpException } from '@nestjs/common';
import { ShareService } from './share.service';
import { ShareDto } from './dto/share.dto';
import { ListShareDto } from './dto/list-share.dto';
import { ReferencePipe } from 'src/pipes/reference/reference.pipe';
import { DatePipe } from 'src/pipes/date/date.pipe';

@Controller('share')
export class ShareController {

  constructor(
    private readonly shareService: ShareService,
  ) {}

  @Post()
  share(
    @Body(ReferencePipe, DatePipe) shareDto: ShareDto
    ) {
    return this.shareService.share(shareDto);
  }

  @Get()
  listShare(
    @Query() listShareDto: ListShareDto
  ) {
    if (!this.shareService.listShare(listShareDto)) {
      throw new HttpException("Share not found", HttpStatus.NOT_FOUND)
    }
    return this.shareService.listShare(listShareDto);
  }

  @Get(':ref')
  showShareDetail(
    @Param('ref') ref: string
    ) {
    if (!this.shareService.showShareDetail(ref)) {
      throw new HttpException("Share not found", HttpStatus.NOT_FOUND)
    }
    return this.shareService.showShareDetail(ref);
  }
}
