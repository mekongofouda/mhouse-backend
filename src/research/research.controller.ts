import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, HttpException, Query } from '@nestjs/common';
import { ResearchService } from './research.service';
import { SearchDto } from './dto/search.dto';
import { ReferencePipe } from 'src/pipes/reference/reference.pipe';
import { ShowResearchResultDto } from './dto/show-research-result.dto';

@Controller('research')
export class ResearchController {

  constructor(
    private readonly researchService: ResearchService,
  ) {}

  @Post()
  search(
    @Body(ReferencePipe) searchDto: SearchDto
    ) {
    return this.researchService.search(searchDto);
  }

  @Get()
  showResearchResult(
    @Query() showResearchResultDto: ShowResearchResultDto
  ) {
    if (!this.researchService.showResearchResult()) {
      throw new HttpException("Research not found", HttpStatus.NOT_FOUND)
    }
    return this.researchService.showResearchResult();
  }

  @Get(':ref')
  showResearchDetail(
    @Param('ref') ref: string
    ) {
    if (!this.researchService.showResearchDetail()) {
      throw new HttpException("Research not found", HttpStatus.NOT_FOUND)
    }
    return this.researchService.showResearchDetail();
  }

}
