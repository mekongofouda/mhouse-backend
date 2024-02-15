import { Type } from 'class-transformer';
import { IsDate, IsInt, IsOptional } from 'class-validator';

export class ListRoleDto {
  @IsInt()
  @IsOptional()
  @Type(() => Number)
  all: number;

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  createdAt: Date;

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  updatedAt: Date;
}
