import { IsEmail, IsOptional } from 'class-validator';

export class ValidateResetAdressDto {
  @IsEmail()
  @IsOptional()
  email: string;
}
