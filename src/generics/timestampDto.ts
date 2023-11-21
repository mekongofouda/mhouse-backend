import { Type } from 'class-transformer';
import { IsDate, IsOptional } from 'class-validator';

export class TimestampDto {

    @IsDate()
    @IsOptional()
    @Type(()=> Date)
    createdAt: Date;

    @IsDate()
    @IsOptional()
    @Type(()=> Date)
    updatedAt: Date;

}
 