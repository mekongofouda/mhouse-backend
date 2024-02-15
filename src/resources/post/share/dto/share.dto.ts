import {
  IsEmpty,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class ShareDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(20, {
    message: 'La taille maximale de la référence est de 20 caractères',
  })
  refPost: string;

  @IsString()
  @IsOptional()
  @MaxLength(128, {
    message: 'La taille maximale du titre est de 32 caractères',
  })
  adress: string;
}
