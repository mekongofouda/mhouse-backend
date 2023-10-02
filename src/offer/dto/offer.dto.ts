import { Type } from "class-transformer";
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from "class-validator";

export class OfferDto {
    
    @IsString()
    @IsNotEmpty()
    @MaxLength(20, { message: "La taille maximale de la référence est de 20 caractères"})
    refPost: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(32, { message: "La taille maximale du paymentrate est de 64 caractères"})
    paymentRate: string;

    @IsNumber()
    @IsOptional()
    @Type(()=> Number)
    nbrPaymentMin: number;

    @IsNumber()
    @IsNotEmpty()
    @Type(()=> Number)
    amount: number;

    @IsString()
    @IsOptional()
    @MaxLength(128, { message: "La taille maximale de la resource 'other' est de 16 caractères"})
    other: string;

}
