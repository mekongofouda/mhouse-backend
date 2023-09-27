import { PartialType } from '@nestjs/mapped-types';
import { AddPrivilegeDto } from './add-privilege.dto';

export class UpdatePrivilegeDto extends PartialType(AddPrivilegeDto) {}
