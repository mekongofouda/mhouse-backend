import { Type } from "class-transformer";
import { IsBase64, IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from "class-validator";

export class AddRealEstateDto {

    @IsString()
    @IsNotEmpty()
    @MaxLength(20, { message: "La taille maximale de la référence est de 20 caractères"})
    refService: string;

    @IsString()
    @IsOptional()
    @MaxLength(64, { message: "La taille maximale du titre est de 64 caractères"})
    type: string;

    @IsNumber()
    @IsOptional()
    @Type(()=> Number)
    surface: number;

    @IsNumber()
    @IsOptional()
    @Type(()=> Number)
    surfBatie: number;

    @IsNumber()
    @IsOptional()
    @Type(()=> Number)
    roadDistance: number;

    @IsBoolean()
    @IsNotEmpty()
    @Type(()=> Boolean)
    garage: boolean;

    @IsBoolean()
    @IsOptional()
    @Type(()=> Boolean)
    cable: boolean;

    @IsBoolean()
    @IsOptional()
    @Type(()=> Boolean)
    internet: boolean;

    @IsBase64()
    @IsOptional()
    image: string;

}
