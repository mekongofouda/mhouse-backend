import { IsEmail, IsNotEmpty, IsNumber, IsString, Length } from "class-validator";

export class ValidateResetCodeDto {

    @IsNumber()
    @IsNotEmpty()
    resetCode: number;

    @IsEmail()
    @IsNotEmpty()
    validEmail: string;

}
