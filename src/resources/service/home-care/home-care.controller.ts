import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HomeCareService } from './home-care.service';
import { CreateHomeCareDto } from './dto/create-home-care.dto';
import { UpdateHomeCareDto } from './dto/update-home-care.dto';

@Controller('home-care')
export class HomeCareController {
  constructor(private readonly homeCareService: HomeCareService) {}

  @Post()
  create(@Body() createHomeCareDto: CreateHomeCareDto) {
    return this.homeCareService.create(createHomeCareDto);
  }

  @Get()
  findAll() {
    return this.homeCareService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.homeCareService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHomeCareDto: UpdateHomeCareDto) {
    return this.homeCareService.update(+id, updateHomeCareDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.homeCareService.remove(+id);
  }
}
