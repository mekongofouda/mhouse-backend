import { IsAlpha, IsEmpty, IsInt, IsNumber, IsOptional, IsString, MaxLength } from "class-validator";

export class SponsorDto {

    @IsEmpty()
    refSponsor: string;

    @IsString()
    @IsOptional()
    @MaxLength(32, { message: "La taille maximale du titre est de 32 caractères"})
    localisation: string;
    
    @IsNumber()
    @IsOptional()
    nbrCustomers: number;

    @IsNumber()
    @IsOptional()
    nbrDays: number;

    @IsNumber()
    @IsOptional()
    cost: number;

    @IsString()
    @IsOptional()
    @MaxLength(16, { message: "La taille maximale de la resource est de 16 caractères"})
    type: string;

    @IsString()
    @IsOptional()
    @MaxLength(10, { message: "La taille maximale de la resource est de 16 caractères"})
    devise: string;

}
