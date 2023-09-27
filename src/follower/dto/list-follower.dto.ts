import { Type } from "class-transformer";
import { IsDateString, IsOptional, IsString, Length } from "class-validator";

export class ListFollowerDto {
    
    @IsString()
    @IsOptional()
    @Length(32, 32, { message: "La taille maximale du titre est de 32 caractères"})
    refAccount: string;
    
    @IsDateString()
    @IsOptional()
    @Type(()=> Date)
    createdAt: Date;

    @IsDateString()
    @IsOptional()
    @Type(()=> Date)
    updatedAt: Date;

}
