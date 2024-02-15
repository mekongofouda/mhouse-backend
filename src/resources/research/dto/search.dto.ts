import { IsBoolean, IsOptional } from 'class-validator';

export class SearchDto {
  @IsBoolean()
  @IsOptional()
  text: string;

  @IsBoolean()
  @IsOptional()
  account: boolean;

  @IsBoolean()
  @IsOptional()
  post: boolean;

  @IsBoolean()
  @IsOptional()
  service: boolean;
}
