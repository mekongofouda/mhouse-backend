import { PartialType } from '@nestjs/mapped-types';
import { CreateHomeCareRealisationDto } from './create-home-care-realisation.dto';

export class UpdateHomeCareRealisationDto extends PartialType(CreateHomeCareRealisationDto) {}
