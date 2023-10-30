import { PartialType } from '@nestjs/mapped-types';
import { AddHomeStandingRealisationDto } from './add-home-standing-realisation.dto';

export class UpdateHomeStandingRealisationDto extends PartialType(AddHomeStandingRealisationDto) {}
