import { Type } from "class-transformer";
import { IsDateString, IsOptional, IsString, MaxLength } from "class-validator";

export class ListServiceDto {

    @IsDateString()
    @IsOptional()
    @Type(()=> Date)
    createdAt: Date;

    @IsDateString()
    @IsOptional()
    @Type(()=> Date)
    updatedAt: Date;
    
}
