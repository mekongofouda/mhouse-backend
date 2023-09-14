import { OmitType } from '@nestjs/mapped-types';
import { AddPrivilegeDto } from './add-privilege.dto';

export class UpdatePrivilegeDto extends OmitType(AddPrivilegeDto, ['reference'] as const) {
    
}
