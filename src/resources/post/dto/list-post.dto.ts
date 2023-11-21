import { Type } from "class-transformer";
import { IsInt, IsOptional, IsString, MaxLength } from "class-validator";
import { TimestampDto } from "src/generics/timestampDto";

export class ListPostDto extends TimestampDto {    
    
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
    @MaxLength(20, { message: "La taille maximale de la référence service est de 20 caractères"})
    refService: string;

}
