import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UpgradingService } from './upgrading.service';
import { CreateUpgradingDto } from './dto/create-upgrading.dto';
import { UpdateUpgradingDto } from './dto/update-upgrading.dto';

@Controller('upgrading')
export class UpgradingController {
  constructor(private readonly upgradingService: UpgradingService) {}

  @Post()
  create(@Body() createUpgradingDto: CreateUpgradingDto) {
    return this.upgradingService.create(createUpgradingDto);
  }

  @Get()
  findAll() {
    return this.upgradingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.upgradingService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUpgradingDto: UpdateUpgradingDto) {
    return this.upgradingService.update(+id, updateUpgradingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.upgradingService.remove(+id);
  }
}
