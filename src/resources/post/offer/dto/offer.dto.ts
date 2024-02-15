import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class OfferDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(20, {
    message: 'La taille maximale de la référence post est de 20 caractères',
  })
  refPost: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(64, {
    message: 'La taille maximale du paymentrate est de 64 caractères',
  })
  paymentRate: string;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  nbrPaymentMin: number;

  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  amount: number;

  @IsString()
  @IsOptional()
  @MaxLength(256, {
    message: "La taille maximale de la resource 'other' est de 256 caractères",
  })
  other: string;
}
