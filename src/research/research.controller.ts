import { Controller, Get, Post, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ResearchService } from './research.service';
import { SearchDto } from './dto/search.dto';
import { ReferencePipe } from 'src/pipes/reference/reference.pipe';
import { ShowResearchResultDto } from './dto/show-research-result.dto';
import { JwtAuthGuard } from 'src/auth/auth.guard';

@Controller('research')
export class ResearchController {

  constructor(
    private readonly researchService: ResearchService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async search(
    @Body(ReferencePipe) searchDto: SearchDto
    ) {
    return await this.researchService.search(searchDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async showResearchResult(
    @Query() showResearchResultDto: ShowResearchResultDto
  ) {
    return await this.researchService.showResearchResult(showResearchResultDto);
  }

  @Get(':ref')
  @UseGuards(JwtAuthGuard)
  async showResearchDetail(
    @Param('ref') ref: string
    ) {
    return await this.researchService.showResearchDetail();
  }

}
