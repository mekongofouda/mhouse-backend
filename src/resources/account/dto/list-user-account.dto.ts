import { Type } from "class-transformer";
import { IsDate, IsDateString, IsOptional, IsString, MaxLength } from "class-validator";

export class ListUserAccountDto {

    @IsString()
    @IsOptional()
    @MaxLength(20, { 
        message: "La taille maximale de la référence est de 20 caractères"
    })
    refRole: string;
    
    @IsDate()
    @IsOptional()
    @Type(()=> Date)
    createdAt: Date;

    @IsDateString()
    @IsOptional()
    @Type(()=> Date)
    updatedAt: Date;

}
