import { Type } from "class-transformer";
import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, IsStrongPassword, MaxLength, MinLength } from "class-validator";

export class UpdateUserAccountDto {
  
  @IsString()
  @IsNotEmpty()
  @MaxLength(64, { message: 'La taille maximale du nom est de 64 caractères' })
  name: string;

  @IsString()
  @IsOptional()
  @MaxLength(64, {
    message: 'La taille maximale du prénom est de 64 caractères',
  })
  surname: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  phone: number;

  @IsStrongPassword()
  @IsNotEmpty()
  @MinLength(10, {
    message: 'La taille minimale du mot de passe est de 10 caractères',
  })
  password: string;

}
