import { Injectable } from '@nestjs/common';
import { AddHomeCareRealisationDto } from './dto/add-home-care-realisation.dto';
import { UpdateHomeCareRealisationDto } from './dto/update-home-care-realisation.dto';

@Injectable()
export class HomeCareRealisationService {
  async addHomeCareRealisation( addHomeCareRealisationDto: AddHomeCareRealisationDto) {
    return 'This action adds a new homeCareRealisation';
  }

  async listHomeCareRealisation() {
    return `This action returns all homeCareRealisation`;
  }

  async showHomeCareRealisationDetail(id: string) {
    return `This action returns a #${id} homeCareRealisation`;
  }

  async updateHomeCareRealisation(id: string, updateHomeCareRealisationDto: UpdateHomeCareRealisationDto) {
    return `This action updates a #${id} homeCareRealisation`;
  }

  async deleteHomeCareRealisation(id: string) {
    return `This action removes a #${id} homeCareRealisation`;
  }
}
