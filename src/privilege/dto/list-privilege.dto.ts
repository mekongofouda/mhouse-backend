import { Type } from "class-transformer";
import { IsAlpha, IsAlphanumeric, IsDate, IsDateString, IsOptional, IsString, Length, MaxLength } from "class-validator";

export class ListPrivilegeDto {

    @IsString()
    @IsOptional()
    @IsAlphanumeric()
    @Length(10, 10, { message: "La taille de la référence est de 10 caractères"})
    refUser: string;
    
    @IsString()
    @IsOptional()
    @IsAlphanumeric()
    @Length(10, 10, { message: "La taille de la référence est de 10 caractères"})
    refRole: string;

    @IsString()
    @IsOptional()
    @IsAlpha()
    @MaxLength(16, { message: "La taille maximale de la resource est de 16 caractères"})
    resource: string;

    @IsDateString()
    @IsOptional()
    @Type(()=> Date)
    createdAt: Date;

    @IsDate()
    @IsOptional()
    @Type(()=> Date)
    updatedAt: Date;

}
