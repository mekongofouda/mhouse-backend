import { Type } from "class-transformer";
import { IsDate, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, IsStrongPassword, MaxLength, MinLength } from "class-validator";

export class RegisterDto {

    @IsString()
    @IsNotEmpty()
    @MaxLength( 64, { message: "La taille maximale du nom est de 64 caractères" })
    name: string;
    
    @IsString()
    @IsOptional()
    @MaxLength( 64, { message: "La taille maximale du prénom est de 64 caractères" })
    surname: string;

    @IsDate()
    @IsOptional()
    dayBirth: Date;

    @IsString()
    @IsOptional()
    @MaxLength( 128, { message: "La taille maximale du lieu de naissance est de 128 caractères" })
    placeBirth: string;

    @IsString()
    @IsOptional()
    @MaxLength( 16, { message: "La taille maximale de l' est de 16 caractères" })
    icn: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNumber()
    @IsNotEmpty()
    @Type(()=> Number)
    phone: number;

    @IsString()
    @IsOptional()
    avatar: string;

    @IsStrongPassword()
    @IsNotEmpty()
    @MinLength( 10, { message: "La taille minimale du mot de passe est de 10 caractères" })
    password: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength( 64, { message: "La taille maximale du lieu de naissance est de 64 caractères" })
    accountType: string;

}
