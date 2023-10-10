import { Controller, Get, Post, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ResearchService } from './research.service';
import { SearchDto } from './dto/search.dto';
import { ReferencePipe } from 'src/pipes/reference/reference.pipe';
import { ShowResearchResultDto } from './dto/show-research-result.dto';
import { JwtAuthGuard } from 'src/resources/auth/auth.guard';
import { MhouseResponseInterface } from 'src/interfaces/mhouse-response.interface';

@Controller('research')
export class ResearchController {

  constructor(
    private readonly researchService: ResearchService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async search(
    @Body(ReferencePipe) searchDto: SearchDto
    ): Promise<MhouseResponseInterface> {
    const data = await this.researchService.search(searchDto);
    return {
      data: data,
      message: "Recherche effectuée avec succès",
      code:"200"
    }
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async showResearchResult(
    @Query() showResearchResultDto: ShowResearchResultDto
  ): Promise<MhouseResponseInterface> {
    const data = await this.researchService.showResearchResult(showResearchResultDto);
    return {
      data: data,
      message: "Résultats de recherche obtenus avec succès",
      code:"200"
    }
  }

  @Get(':ref')
  @UseGuards(JwtAuthGuard)
  async showResearchDetail(
    @Param('ref') ref: string
    ): Promise<MhouseResponseInterface> {
    const data = await this.researchService.showResearchDetail();
    return {
      data: data,
      message: "Liste des offres obtenue avec succès",
      code:"200"
    };
  }

}
