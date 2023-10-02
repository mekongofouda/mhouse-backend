import { Type } from "class-transformer";
import { IsDateString, IsOptional, IsString, MaxLength } from "class-validator";

export class ListUserAccountDto {

    @IsString()
    @IsOptional()
    @MaxLength(16, { 
        message: "La taille maximale de la référence est de 32 caractères"
    })
    refRole: string;
    
    @IsDateString()
    @IsOptional()
    @Type(()=> Date)
    createdAt: Date;

    @IsDateString()
    @IsOptional()
    @Type(()=> Date)
    updatedAt: Date;

}
