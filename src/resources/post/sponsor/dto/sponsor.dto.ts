import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class SponsorDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(20, {
    message: 'La taille maximale de la référence est de 20 caractères',
  })
  refPost: string;

  @IsString()
  @IsOptional()
  @MaxLength(64, {
    message: 'La taille maximale de la ville est de 64 caractères',
  })
  town: string;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  nbrCustomers: number;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  nbrDays: number;

  @IsString()
  @IsOptional()
  @MaxLength(32, { message: 'La taille maximale du type est de 32 caractères' })
  type: string;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  cost: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(10, {
    message: 'La taille maximale de la devise est de 16 caractères',
  })
  devise: string;
}
