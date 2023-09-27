import { IsEmail, IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";

export class InviteUserDto {

    @IsEmail()
    @IsNotEmpty()
    emailAdress: string;
    
}
