import { IsEmail, IsOptional, MaxLength } from "class-validator";

export class ValidateResetAdressDto {

    @IsEmail()
    @IsOptional()
    email: string;

}
