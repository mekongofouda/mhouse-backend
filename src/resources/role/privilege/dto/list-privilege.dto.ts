import { Type } from 'class-transformer';
import {
  IsAlpha,
  IsDate,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { TimestampDto } from 'src/generics/timestampDto';

export class ListPrivilegeDto extends TimestampDto {
  @IsInt()
  @IsOptional()
  @Type(() => Number)
  all: number;

  @IsString()
  @IsOptional()
  @MaxLength(20, {
    message: 'La taille maximale de la reference account est de 20 caractères',
  })
  refAccount: string;

  @IsString()
  @IsOptional()
  @MaxLength(20, {
    message: 'La taille maximale de la reference role est de 20 caractères',
  })
  refRole: string;

  @IsString()
  @IsOptional()
  @IsAlpha()
  @MaxLength(32, {
    message: 'La taille maximale de la resource est de 32 caractères',
  })
  resource: string;
}
