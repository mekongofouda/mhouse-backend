import { PartialType } from '@nestjs/mapped-types';
import {AddHomeCareDto } from './add-home-care.dto';

export class UpdateHomeCareDto extends PartialType(AddHomeCareDto) {}
