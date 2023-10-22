import { Type } from "class-transformer";
import { IsAlpha, IsDate, IsInt, IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";

export class ListPrivilegeDto {

    @IsInt()
    @IsOptional()
    @Type(()=> Number)
    all: number;

    @IsString()
    @IsNotEmpty()
    refAccount: string;

    @IsString()
    @IsNotEmpty()
    refRole: string;

    @IsString()
    @IsOptional()
    @IsAlpha()
    @MaxLength(16, { message: "La taille maximale de la resource est de 16 caractères"})
    resource: string;

    @IsDate()
    @IsOptional()
    @Type(()=> Date)
    createdAt: Date;

    @IsDate()
    @IsOptional()
    @Type(()=> Date)
    updatedAt: Date;

}
