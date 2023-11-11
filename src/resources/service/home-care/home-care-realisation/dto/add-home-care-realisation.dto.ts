import { Type } from "class-transformer";
import { IsBase64, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from "class-validator";

export class AddHomeCareRealisationDto {

    @IsString()
    @IsNotEmpty()
    @MaxLength(20, { message: "La taille maximale de la référence est de 20 caractères"})
    refHomeCare: string;

    @IsString()
    @IsOptional()
    @MaxLength(128, { message: "La taille maximale du titre est de 128 caractères"})
    title: string;

    @IsString()
    @IsOptional()
    @MaxLength(256, { message: "La taille maximale de la description est de 256 caractères"})
    description: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(64, { message: "La taille maximale du type est de 64 caractères"})
    type: string;

    @IsBase64()
    @IsOptional()
    image: string;
    
}
