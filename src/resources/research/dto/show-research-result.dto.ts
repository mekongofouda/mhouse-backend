import { Type } from "class-transformer";
import { IsDate, IsOptional } from "class-validator";

export class ShowResearchResultDto {
    
    @IsDate()
    @IsOptional()
    @Type(()=> Date)
    createdAt: Date;

    @IsDate()
    @IsOptional()
    @Type(()=> Date)
    updatedAt: Date;

}
