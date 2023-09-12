import { PartialType } from '@nestjs/mapped-types';
import { CreatePrivilegeDto } from './add-privilege.dto';

export class UpdatePrivilegeDto extends PartialType(CreatePrivilegeDto) {}
