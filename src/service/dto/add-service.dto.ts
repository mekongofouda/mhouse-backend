import { IsEmpty, IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";

export class AddServiceDto {

    @IsEmpty()
    refService: string;

    @IsString()
    @IsOptional()
    @MaxLength(32, { message: "La taille maximale du titre est de 32 caractères"})
    title: string;
    
    @IsString()
    @IsOptional()
    @MaxLength(64, { message: "La taille maximale de la description est de 64 caractères"})
    description: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(16, { message: "La taille maximale de la resource est de 16 caractères"})
    type: string;

    @IsString()
    @IsOptional()
    @MaxLength(64, { message: "La taille maximale de la description est de 64 caractères"})
    views: number;

    @IsString()
    @IsNotEmpty()
    @MaxLength(16, { message: "La taille maximale de la resource est de 16 caractères"})
    paymentRate: string;

    @IsString()
    @IsOptional()
    nbrPaymentMin: number;

    @IsString()
    @IsNotEmpty()
    amount: number;
}
