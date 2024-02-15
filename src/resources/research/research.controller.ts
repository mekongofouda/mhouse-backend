import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  UseGuards,
  HttpStatus,
} from '@nestjs/common';
import { ResearchService } from './research.service';
import { SearchDto } from './dto/search.dto';
import { ReferencePipe } from 'src/pipes/reference/reference.pipe';
import { ShowResearchResultDto } from './dto/show-research-result.dto';
import { JwtAuthGuard } from 'src/resources/account/auth/auth.guard';
import { MhouseResponseInterface } from 'src/interfaces/mhouse-response.interface';
import { Account } from 'src/decorators/account.decorator';
import { AccountEntity } from '../account/entities/account.entity';

@Controller('research')
export class ResearchController {
  constructor(private readonly researchService: ResearchService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async search(
    @Body(ReferencePipe) searchDto: SearchDto,
    @Account() account: AccountEntity,
  ): Promise<MhouseResponseInterface> {
    const data = await this.researchService.search(searchDto, account);
    return {
      data: data,
      message: 'Recherche effectuée avec succès',
      code: HttpStatus.OK,
    };
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async showResearchResult(
    @Query() showResearchResultDto: ShowResearchResultDto,
    @Account() account: AccountEntity,
  ): Promise<MhouseResponseInterface> {
    const data = await this.researchService.showResearchResult(
      showResearchResultDto,
      account,
    );
    return {
      data: data,
      message: 'Résultats de recherche obtenus avec succès',
      code: HttpStatus.OK,
    };
  }

  @Get(':ref')
  @UseGuards(JwtAuthGuard)
  async showResearchDetail(
    @Param('ref') ref: string,
    @Account() account: AccountEntity,
  ): Promise<MhouseResponseInterface> {
    const data = await this.researchService.showResearchDetail(ref, account);
    return {
      data: data,
      message: 'Liste des offres obtenue avec succès',
      code: HttpStatus.OK,
    };
  }
}
