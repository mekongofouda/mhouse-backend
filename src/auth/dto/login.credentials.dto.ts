import { IsEmail, IsNotEmpty, IsString,MinLength } from "class-validator";

export class LoginCredentialsDto {
    
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(
        10, 
        { 
            message: "La taille Minimale du mot de passe est de 10 caractères"
        }
    )
    password: string;

}
