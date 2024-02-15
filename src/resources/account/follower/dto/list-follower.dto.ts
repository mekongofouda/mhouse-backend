import { IsOptional, IsString, MaxLength } from 'class-validator';

export class ListFollowerDto {
  @IsString()
  @IsOptional()
  @MaxLength(20, {
    message: 'La taille maximale de la référence user est de 20 caractères',
  })
  refAccount: string;
}
