import { PartialType } from '@nestjs/mapped-types';
import { AddDiscussionDto } from './add-discussion.dto';

export class UpdateDiscussionDto extends PartialType(AddDiscussionDto) {}
