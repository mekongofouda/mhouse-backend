import { Type } from 'class-transformer';
import {
  IsDate,
  IsInt,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class ListSponsorDto {
  @IsInt()
  @IsOptional()
  @Type(() => Number)
  all: number;

  @IsString()
  @IsOptional()
  @MaxLength(20, {
    message: 'La taille maximale du titre est de 20 caractères',
  })
  refAccount: string;

  @IsString()
  @IsOptional()
  @MaxLength(20, {
    message: 'La taille maximale de la description est de 20S caractères',
  })
  refPost: string;

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  createdAt: Date;

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  updatedAt: Date;
}
