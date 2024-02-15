import { OmitType } from '@nestjs/mapped-types';
import { AddDiscussionDto } from './add-discussion.dto';

export class UpdateDiscussionDto extends OmitType(AddDiscussionDto, [
  'refCustomer',
]) {}
