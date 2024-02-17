import { Type } from 'class-transformer';
import { IsDate, IsInt, IsOptional } from 'class-validator';
import { TimestampDto } from 'src/generics/timestampDto';

export class ListRoleDto extends TimestampDto {

  @IsInt()
  @IsOptional()
  @Type(() => Number)
  all: number;

}
