import { OmitType, PartialType } from '@nestjs/mapped-types';
import { PostDto } from './post.dto';

export class UpdatePostDto extends OmitType(PostDto, ['refService']) {}
