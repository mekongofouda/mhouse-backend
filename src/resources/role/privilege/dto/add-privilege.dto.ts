import {
  IsAlpha,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class AddPrivilegeDto {
  @IsString()
  @IsOptional()
  refRole: string;

  @IsString()
  @IsOptional()
  @MaxLength(10, { message: 'La taille maximale du code est de 10 caractères' })
  code: string;

  @IsString()
  @IsOptional()
  @MaxLength(64, {
    message: 'La taille maximale du titre est de 64 caractères',
  })
  title: string;

  @IsString()
  @IsOptional()
  @MaxLength(128, {
    message: 'La taille maximale de la description est de 128 caractères',
  })
  description: string;

  @IsString()
  @IsNotEmpty()
  @IsAlpha()
  @MaxLength(32, {
    message: 'La taille maximale de la resource est de 32 caractères',
  })
  resource: string;
}
