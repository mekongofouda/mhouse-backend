import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class PostDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(20, {
    message: 'La taille maximale de la reference service est de 20 caractères',
  })
  refService: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(128, {
    message: 'La taille maximale du titre est de 128 caractères',
  })
  title: string;

  @IsString()
  @IsOptional()
  @MaxLength(256, {
    message: 'La taille maximale de la description est de 256 caractères',
  })
  description: string;
}
