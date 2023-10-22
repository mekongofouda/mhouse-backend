import { Injectable } from '@nestjs/common';
import { CreateHomeStandingRealisationDto } from './dto/create-home-standing-realisation.dto';
import { UpdateHomeStandingRealisationDto } from './dto/update-home-standing-realisation.dto';

@Injectable()
export class HomeStandingRealisationService {
  create(createHomeStandingRealisationDto: CreateHomeStandingRealisationDto) {
    return 'This action adds a new homeStandingRealisation';
  }

  findAll() {
    return `This action returns all homeStandingRealisation`;
  }

  findOne(id: number) {
    return `This action returns a #${id} homeStandingRealisation`;
  }

  update(id: number, updateHomeStandingRealisationDto: UpdateHomeStandingRealisationDto) {
    return `This action updates a #${id} homeStandingRealisation`;
  }

  remove(id: number) {
    return `This action removes a #${id} homeStandingRealisation`;
  }
}
