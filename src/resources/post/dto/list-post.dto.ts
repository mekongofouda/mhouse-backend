import { Type } from "class-transformer";
import { IsDateString, IsOptional, IsString, MaxLength } from "class-validator";

export class ListPostDto {    
    
    @IsString()
    @IsOptional()
    @MaxLength(64, { message: "La taille maximale de la description est de 64 caractères"})
    refService: string;

    @IsDateString()
    @IsOptional()
    @Type(()=> Date)
    createdAt: Date;

    @IsDateString()
    @IsOptional()
    @Type(()=> Date)
    updatedAt: Date;


}
