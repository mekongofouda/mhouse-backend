import { IsNotEmpty, IsStrongPassword, MinLength } from "class-validator";

export class UpdatePasswordDto {
    
    @IsStrongPassword()
    @IsNotEmpty()
    @MinLength(10, { message: "La taille minimale du mot de passe est de 10 caractères"})
    password: string;

    @IsNotEmpty()
    @MinLength(10, { message: "La taille minimale du mot de passe confirmé est de 10 caractères"})
    passwordConfirmed: string;

}
