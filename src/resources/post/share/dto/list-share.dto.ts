import { Type } from "class-transformer";
import { IsDate, IsInt, IsOptional, IsString, MaxLength } from "class-validator";

export class ListShareDto {

    @IsInt()
    @IsOptional()
    @Type(()=> Number)
    all: number;

    @IsString()
    @IsOptional()
    @MaxLength(16, { message: "La taille maximale du titre est de 32 caractères"})
    refAccount: string;
    
    @IsString()
    @IsOptional()
    @MaxLength(16, { message: "La taille maximale de la description est de 64 caractères"})
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
