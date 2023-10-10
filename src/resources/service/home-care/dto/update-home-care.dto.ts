import { PartialType } from '@nestjs/mapped-types';
import { CreateHomeCareDto } from './create-home-care.dto';

export class UpdateHomeCareDto extends PartialType(CreateHomeCareDto) {}
