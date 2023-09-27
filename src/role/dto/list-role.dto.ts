import { Type } from "class-transformer";
import { IsAlphanumeric, IsDate, IsOptional, IsString, Length } from "class-validator";

export class ListRoleDto {    
    
    @IsString()
    @IsOptional()
    @IsAlphanumeric()
    @Length(10, 10, { message: "La taille de la référence est de 10 caractères"})
    refUser: string;
    
    @IsDate()
    @IsOptional()
    @Type(()=> Date)
    createdAt: Date;

    @IsDate()
    @IsOptional()
    @Type(()=> Date)
    updatedAt: Date;

}
