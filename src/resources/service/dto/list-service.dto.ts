import { Type } from 'class-transformer';
import { IsDate, IsInt, IsOptional, IsString } from 'class-validator';

export class ListServiceDto {
  @IsInt()
  @IsOptional()
  @Type(() => Number)
  all: number;

  @IsString()
  @IsOptional()
  refAccount: string;

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  createdAt: Date;

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  updatedAt: Date;
}
