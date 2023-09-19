import { Type } from "class-transformer";
import { IsAlpha, IsAlphanumeric, IsDate, IsOptional, IsString, Length } from "class-validator";

export class ListPrivilegeDto {

    @IsString()
    @IsOptional()
    @IsAlphanumeric()
    @Length(10, 10, { message: "La taille minimale "})
    refUser: string;

    @IsString()
    @IsOptional()
    @IsAlphanumeric()
    @Length(10, 10, { message: "La taille minimale "})
    refService: string;
    
    @IsString()
    @IsOptional()
    @IsAlphanumeric()
    @Length(10, 10, { message: "La taille minimale "})
    refRole: string;

    @IsString()
    @IsOptional()
    @IsAlpha()
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
