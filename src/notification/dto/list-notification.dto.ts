import { Type } from "class-transformer";
import { IsDateString, IsOptional, IsString, MaxLength } from "class-validator";

export class ListNotificationDto {

    @IsString()
    @IsOptional()
    @MaxLength(16, { message: "La taille maximale du titre est de 32 caractères"})
    refUser: string;
    
    @IsString()
    @IsOptional()
    @MaxLength(16, { message: "La taille maximale de la description est de 64 caractères"})
    refLike: string;

    @IsString()
    @IsOptional()
    @MaxLength(16, { message: "La taille maximale de la resource est de 16 caractères"})
    refOffer: string;

    @IsString()
    @IsOptional()
    @MaxLength(16, { message: "La taille maximale de la resource est de 16 caractères"})
    refPost: string;

    @IsDateString()
    @IsOptional()
    @Type(()=> Date)
    createdAt: Date;

    @IsDateString()
    @IsOptional()
    @Type(()=> Date)
    updatedAt: Date;

    
}
