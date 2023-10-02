import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsStrongPassword, Length, MaxLength, MinLength } from "class-validator";

export class ResetPasswordDto {

    @IsStrongPassword()
    @IsNotEmpty()
    @MinLength(10, { message: "La taille maximale du mot de passe est de 32 caractères"})
    password: string;

    @IsNotEmpty()
    @MinLength(10, { message: "La taille maximale du mot de passe est de 32 caractères"})
    passwordConfirmed: string;

    @IsNumber()
    @IsNotEmpty()
    @Type(()=> Number)
    validCode: number;

}
