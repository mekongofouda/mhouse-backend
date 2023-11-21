import { Type } from "class-transformer";
import { IsDate, IsInt, IsOptional, IsString, MaxLength } from "class-validator";
import { TimestampDto } from "src/generics/timestampDto";

export class ListLikeDto extends TimestampDto {

    @IsInt()
    @IsOptional()
    @Type(()=> Number)
    all: number;

    @IsString()
    @IsOptional()
    @MaxLength(20, { message: "La taille maximale de la reference user est de 20 caractères"})
    refAccount: string;

    @IsString()
    @IsOptional()
    @MaxLength(20, { message: "La taille maximale de la référence du post est de 20 caractères"})
    refPost: string;
 
}
