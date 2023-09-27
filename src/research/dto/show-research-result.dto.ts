import { Type } from "class-transformer";
import { IsDateString, IsOptional } from "class-validator";

export class ShowResearchResultDto {
    
    @IsDateString()
    @IsOptional()
    @Type(()=> Date)
    createdAt: Date;

    @IsDateString()
    @IsOptional()
    @Type(()=> Date)
    updatedAt: Date;

}
