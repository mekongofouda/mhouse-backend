import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HomeCareRealisationService } from './home-care-realisation.service';
import { AddHomeCareRealisationDto } from './dto/add-home-care-realisation.dto';
import { UpdateHomeCareRealisationDto } from './dto/update-home-care-realisation.dto';

@Controller('home-care-realisation')
export class HomeCareRealisationController {
  constructor(private readonly homeCareRealisationService: HomeCareRealisationService) {}

  @Post()
  addHomeCareRealisation(
    @Body() addHomeCareRealisationDto: AddHomeCareRealisationDto) {
    return this.homeCareRealisationService.addHomeCareRealisation(addHomeCareRealisationDto);
  }

  @Get()
  listHomeCareRealisation() {
    return this.homeCareRealisationService.listHomeCareRealisation();
  }

  @Get(':ref')
  showHomeCareRealisationDetail(
    @Param('ref') ref: string) {
    return this.homeCareRealisationService.showHomeCareRealisationDetail(ref);
  }

  @Patch(':ref')
  update(
    @Param('ref') ref: string, 
    @Body() updateHomeCareRealisationDto: UpdateHomeCareRealisationDto) {
    return this.homeCareRealisationService.updateHomeCareRealisation(ref, updateHomeCareRealisationDto);
  }

  @Delete(':ref')
  remove(
    @Param('ref') ref: string) {
    return this.homeCareRealisationService.deleteHomeCareRealisation(ref);
  }
}
