import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HomeCareRealisationService } from './home-care-realisation.service';
import { CreateHomeCareRealisationDto } from './dto/create-home-care-realisation.dto';
import { UpdateHomeCareRealisationDto } from './dto/update-home-care-realisation.dto';

@Controller('home-care-realisation')
export class HomeCareRealisationController {
  constructor(private readonly homeCareRealisationService: HomeCareRealisationService) {}

  @Post()
  create(@Body() createHomeCareRealisationDto: CreateHomeCareRealisationDto) {
    return this.homeCareRealisationService.create(createHomeCareRealisationDto);
  }

  @Get()
  findAll() {
    return this.homeCareRealisationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.homeCareRealisationService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHomeCareRealisationDto: UpdateHomeCareRealisationDto) {
    return this.homeCareRealisationService.update(+id, updateHomeCareRealisationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.homeCareRealisationService.remove(+id);
  }
}
