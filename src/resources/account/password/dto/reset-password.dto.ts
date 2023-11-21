import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsStrongPassword, MinLength } from "class-validator";

export class ResetPasswordDto {

    @IsStrongPassword()
    @IsNotEmpty()
    @MinLength(10, { message: "La taille minimale du mot de passe est de 10 caractères"})
    password: string;

    @IsNotEmpty()
    @MinLength(10)
    passwordConfirmed: string;

    @IsNumber()
    @IsNotEmpty()
    @Type(()=> Number)
    validCode: number;

}
