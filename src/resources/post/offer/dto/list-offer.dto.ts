import { Type } from "class-transformer";
import { IsDate, IsInt, IsOptional, IsString, MaxLength } from "class-validator";

export class ListOfferDto {

    @IsInt()
    @IsOptional()
    @Type(()=> Number)
    all: number;

    @IsString()
    @IsOptional()
    @MaxLength(20, { message: "La taille maximale de la référence user est de 20 caractères"})
    refAccount: string;
    
    @IsString()
    @IsOptional()
    @MaxLength(20, { message: "La taille maximale de la description est de 20 caractères"})
    refPost: string;

    @IsDate()
    @IsOptional()
    @Type(()=> Date)
    createdAt: Date;

    @IsDate()
    @IsOptional()
    @Type(()=> Date)
    updatedAt: Date;


}
