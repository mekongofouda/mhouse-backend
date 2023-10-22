import { PartialType } from '@nestjs/mapped-types';
import { AddRealEstateDto } from './add-real-estate.dto';

export class UpdateRealEstateDto extends PartialType(AddRealEstateDto) {}
