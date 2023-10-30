import { PartialType } from '@nestjs/mapped-types';
import { AddHomeCareRealisationDto } from './add-home-care-realisation.dto';

export class UpdateHomeCareRealisationDto extends PartialType(AddHomeCareRealisationDto) {}
