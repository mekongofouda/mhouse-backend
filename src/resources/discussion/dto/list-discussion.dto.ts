import { Type } from "class-transformer";
import { IsDateString, IsOptional, IsString, Length } from "class-validator";

export class ListDiscussionDto {
    
    @IsDateString()
    @IsOptional()
    @Type(()=> Date)
    createdAt: Date;

    @IsDateString()
    @IsOptional()
    @Type(()=> Date)
    updatedAt: Date;

}
