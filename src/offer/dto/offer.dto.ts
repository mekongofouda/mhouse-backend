import { Type } from "class-transformer";
import { IsBoolean, IsEmpty, IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";

export class OfferDto {

    @IsEmpty()
    refOffer: string;

    @IsString()
    @IsOptional()
    @Type(()=> Date)
    paymentDate: Date;
    
    @IsString()
    @IsOptional()
    @MaxLength(32, { message: "La taille maximale de la description est de 64 caractères"})
    paymentRate: string;

    @IsString()
    @IsOptional()
    @Type(()=> Number)
    nbrPaymentMin: number;

    @IsString()
    @IsNotEmpty()
    @Type(()=> Number)
    amount: number;

    @IsString()
    @IsOptional()
    @MaxLength(16, { message: "La taille maximale de la resource est de 16 caractères"})
    other: string;

    @IsBoolean()
    @IsNotEmpty()
    isValidated: boolean;

    @IsBoolean()
    @IsNotEmpty()
    isSent: boolean;
}
