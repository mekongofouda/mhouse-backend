import { Type } from "class-transformer";
import { IsDateString, IsOptional, IsString, MaxLength } from "class-validator";

export class ListLikeDto {

    @IsString()
    @IsOptional()
    @MaxLength(20, { message: "La taille maximale de la description est de 20 caractères"})
    refPost: string;

    @IsDateString()
    @IsOptional()
    @Type(()=> Date)
    createdAt: Date;

    @IsDateString()
    @IsOptional()
    @Type(()=> Date)
    updatedAt: Date;
 
}
