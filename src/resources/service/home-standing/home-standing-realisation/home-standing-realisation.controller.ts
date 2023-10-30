import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HomeStandingRealisationService } from './home-standing-realisation.service';
import { AddHomeStandingRealisationDto } from './dto/add-home-standing-realisation.dto';
import { UpdateHomeStandingRealisationDto } from './dto/update-home-standing-realisation.dto';

@Controller('home-standing-realisation')
export class HomeStandingRealisationController {
  constructor(private readonly homeStandingRealisationService: HomeStandingRealisationService) {}

  @Post()
  addHomeStandingRealisation(
    @Body() addHomeStandingRealisationDto: AddHomeStandingRealisationDto) {
    return this.homeStandingRealisationService.addHomeStandingRealisation(addHomeStandingRealisationDto);
  }

  @Get()
  listHomeStandingRealisation() {
    return this.homeStandingRealisationService.listHomeStandingRealisation();
  }

  @Get(':ref')
  showHomeStandingRealisationDetail(
    @Param('ref') ref: string) {
    return this.homeStandingRealisationService.showHomeStandingRealisationDetail(ref);
  }

  @Patch(':ref')
  updateHomeStandingRealisation(
    @Param('ref') ref: string, 
  @Body() updateHomeStandingRealisationDto: UpdateHomeStandingRealisationDto) {
    return this.homeStandingRealisationService.updateHomeStandingRealisation(ref, updateHomeStandingRealisationDto);
  }

  @Delete(':ref')
  deleteHomeStandingRealisation(
    @Param('ref') ref: string) {
    return this.homeStandingRealisationService.deleteHomeStandingRealisation(ref);
  }
}
