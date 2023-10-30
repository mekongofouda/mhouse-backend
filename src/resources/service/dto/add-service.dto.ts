import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from "class-validator";

export class AddServiceDto {

    @IsString()
    @IsOptional()
    @MaxLength(64, { message: "La taille maximale du titre est de 64 caractères"})
    title: string;
    
    @IsString()
    @IsOptional()
    @MaxLength(64, { message: "La taille maximale de la description est de 64 caractères"})
    description: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(16, { message: "La taille maximale du type est de 16 caractères"})
    type: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(16, { message: "La taille maximale de la tranche de paiement est de 16 caractères"})
    paymentRate: string;

    @IsNumber()
    @IsOptional()
    @Type(()=> Number)
    nbrPaymentMin: number;

    @IsNumber()
    @IsOptional()
    @Type(()=> Number)
    amount: number;

    @IsString()
    @IsOptional()
    country: string;

    @IsString()
    @IsOptional()
    region: string;

    @IsNumber()
    @IsOptional()
    @Type(()=> Number)
    longitude: number;

    @IsNumber()
    @IsOptional()
    @Type(()=> Number)
    latitude: number;

}
