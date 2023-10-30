import { Type } from "class-transformer";
import { IsDate, IsOptional, IsString, Length, MaxLength } from "class-validator";

export class ListFollowerDto {
    
    @IsString()
    @IsOptional()
    @MaxLength(20, { message: "La taille maximale de la référence user est de 20 caractères"})
    refAccount: string;
    
    @IsDate()
    @IsOptional()
    @Type(()=> Date)
    createdAt: Date;

    @IsDate()
    @IsOptional()
    @Type(()=> Date)
    updatedAt: Date;

}
