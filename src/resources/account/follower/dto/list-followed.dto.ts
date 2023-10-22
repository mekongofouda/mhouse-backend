import { Type } from "class-transformer";
import { IsDate, IsOptional, IsString, Length } from "class-validator";

export class ListFollowedDto {

    @IsString()
    @IsOptional()
    @Length(32, 32, { message: "La taille maximale du titre est de 32 caractères"})
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
