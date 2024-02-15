import { IsOptional, IsString, MaxLength } from 'class-validator';

export class FollowDto {
  @IsString()
  @IsOptional()
  @MaxLength(20, {
    message: 'La taille maximale de la référence followed est de 20 caractères',
  })
  refFollowed: string;
}
