import { PartialType } from '@nestjs/mapped-types';
import { ToogleLikeDto } from './toogle-like.dto';

export class ListLikeDto extends PartialType(ToogleLikeDto) {}
