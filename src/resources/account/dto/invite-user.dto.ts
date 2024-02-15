import { IsEmail, IsNotEmpty } from 'class-validator';

export class InviteUserDto {
  @IsEmail()
  @IsNotEmpty()
  emailAdress: string;
}
