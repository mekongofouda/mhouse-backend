import { Injectable } from '@nestjs/common';
import { SearchDto } from './dto/search.dto';
import { ShowResearchResultDto } from './dto/show-research-result.dto';

@Injectable()
export class ResearchService {

  async search(searchDto: SearchDto) {
    return await 'This action adds a new research';
  }

  async showResearchResult(showResearchResultDto: ShowResearchResultDto) {
    return await `This action returns all research`;
  }

  async showResearchDetail() {
    return await `This action returns a research`;
  }

}
