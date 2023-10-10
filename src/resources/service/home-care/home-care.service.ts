import { Injectable } from '@nestjs/common';
import { CreateHomeCareDto } from './dto/create-home-care.dto';
import { UpdateHomeCareDto } from './dto/update-home-care.dto';

@Injectable()
export class HomeCareService {
  create(createHomeCareDto: CreateHomeCareDto) {
    return 'This action adds a new homeCare';
  }

  findAll() {
    return `This action returns all homeCare`;
  }

  findOne(id: number) {
    return `This action returns a #${id} homeCare`;
  }

  update(id: number, updateHomeCareDto: UpdateHomeCareDto) {
    return `This action updates a #${id} homeCare`;
  }

  remove(id: number) {
    return `This action removes a #${id} homeCare`;
  }
}
