import { Injectable } from '@nestjs/common';
import { CreateHomeCareRealisationDto } from './dto/create-home-care-realisation.dto';
import { UpdateHomeCareRealisationDto } from './dto/update-home-care-realisation.dto';

@Injectable()
export class HomeCareRealisationService {
  create(createHomeCareRealisationDto: CreateHomeCareRealisationDto) {
    return 'This action adds a new homeCareRealisation';
  }

  findAll() {
    return `This action returns all homeCareRealisation`;
  }

  findOne(id: number) {
    return `This action returns a #${id} homeCareRealisation`;
  }

  update(id: number, updateHomeCareRealisationDto: UpdateHomeCareRealisationDto) {
    return `This action updates a #${id} homeCareRealisation`;
  }

  remove(id: number) {
    return `This action removes a #${id} homeCareRealisation`;
  }
}
