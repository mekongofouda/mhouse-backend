import { PartialType } from '@nestjs/mapped-types';
import { AddHomeServiceDto } from './add-home-service.dto';

export class UpdateHomeServiceDto extends PartialType(AddHomeServiceDto) {}
