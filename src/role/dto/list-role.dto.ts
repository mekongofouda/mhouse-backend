import { Type } from "class-transformer";
import { IsAlphanumeric, IsDate, IsOptional, IsString, Length } from "class-validator";

export class ListRoleDto {    
        
    @IsDate()
    @IsOptional()
    @Type(()=> Date)
    createdAt: Date;

    @IsDate()
    @IsOptional()
    @Type(()=> Date)
    updatedAt: Date;

}
