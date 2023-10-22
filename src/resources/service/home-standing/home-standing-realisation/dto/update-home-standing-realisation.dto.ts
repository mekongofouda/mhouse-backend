import { PartialType } from '@nestjs/mapped-types';
import { CreateHomeStandingRealisationDto } from './create-home-standing-realisation.dto';

export class UpdateHomeStandingRealisationDto extends PartialType(CreateHomeStandingRealisationDto) {}
