import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HomeStandingRealisationService } from './home-standing-realisation.service';
import { CreateHomeStandingRealisationDto } from './dto/create-home-standing-realisation.dto';
import { UpdateHomeStandingRealisationDto } from './dto/update-home-standing-realisation.dto';

@Controller('home-standing-realisation')
export class HomeStandingRealisationController {
  constructor(private readonly homeStandingRealisationService: HomeStandingRealisationService) {}

  @Post()
  create(@Body() createHomeStandingRealisationDto: CreateHomeStandingRealisationDto) {
    return this.homeStandingRealisationService.create(createHomeStandingRealisationDto);
  }

  @Get()
  findAll() {
    return this.homeStandingRealisationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.homeStandingRealisationService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHomeStandingRealisationDto: UpdateHomeStandingRealisationDto) {
    return this.homeStandingRealisationService.update(+id, updateHomeStandingRealisationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.homeStandingRealisationService.remove(+id);
  }
}
