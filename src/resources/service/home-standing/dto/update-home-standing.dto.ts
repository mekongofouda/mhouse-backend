import { PartialType } from '@nestjs/mapped-types';
import { AddHomeStandingDto } from './add-home-standing.dto';

export class UpdateHomeStandingDto extends PartialType(AddHomeStandingDto) {}
