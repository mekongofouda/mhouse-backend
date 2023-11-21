import { Injectable } from '@nestjs/common';
import { CreateUpgradingDto } from './dto/create-upgrading.dto';
import { UpdateUpgradingDto } from './dto/update-upgrading.dto';

@Injectable()
export class UpgradingService {
  create(createUpgradingDto: CreateUpgradingDto) {
    return 'This action adds a new upgrading';
  }

  findAll() {
    return `This action returns all upgrading`;
  }

  findOne(id: number) {
    return `This action returns a #${id} upgrading`;
  }

  update(id: number, updateUpgradingDto: UpdateUpgradingDto) {
    return `This action updates a #${id} upgrading`;
  }

  remove(id: number) {
    return `This action removes a #${id} upgrading`;
  }
}
