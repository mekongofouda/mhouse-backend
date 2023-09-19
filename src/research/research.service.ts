import { Injectable } from '@nestjs/common';
import { SearchDto } from './dto/search.dto';

@Injectable()
export class ResearchService {

  search(searchDto: SearchDto) {
    return 'This action adds a new research';
  }

  showResearchResult() {
    return `This action returns all research`;
  }

  showResearchDetail() {
    return `This action returns a research`;
  }

}
