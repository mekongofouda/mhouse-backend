import { Type } from "class-transformer";
import { IsDateString, IsOptional, IsString, MaxLength } from "class-validator";

export class ListServiceDto {

    @IsString()
    @IsOptional()
    @MaxLength(16, { message: "La taille maximale du titre est de 32 caractères"})
    refUser: string;

    @IsDateString()
    @IsOptional()
    @Type(()=> Date)
    createdAt: Date;

    @IsDateString()
    @IsOptional()
    @Type(()=> Date)
    updatedAt: Date;

    
}
