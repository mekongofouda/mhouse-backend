import { IsBoolean, IsOptional } from 'class-validator';

export class MarkReadedDto {
  @IsBoolean()
  @IsOptional()
  isReaded: boolean;
}
