import { IsEmail, IsNotEmpty, IsNumber, Length } from "class-validator";

export class ValidateResetCodeDto {

    @IsNumber()
    @IsNotEmpty()
    @Length(5, 5, { message: "La taille du code est de 5 caractères"})
    resetCode: number;

    @IsEmail()
    @IsNotEmpty()
    validEmail: string;

}
