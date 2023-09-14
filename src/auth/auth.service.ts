import { Injectable, UnauthorizedException } from '@nestjs/common';
import { RegisterDto } from './dto/register-auth.dto';
import { LoginDto } from './dto/login-auth.dto';
import { AccountService } from 'src/account/account.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(
      private accountService: AccountService,
      private jwtService: JwtService){}

    async login(loginDto: LoginDto) {

    const account = await this.accountService.getUserDetail(loginDto.name);

    if (account?.password !== loginDto.password) {
      throw new UnauthorizedException();
    }
    const payload = { sub: account.reference, username: account.name };    // TODO: Generate a JWT and return it here
    // instead of the user object
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  logout() {
    return `This action returns a auth`;
  }

  register(registerDto: RegisterDto) {  
    return `This action updates a auth`;
  }

  showLegalMention() {
    return `This action removes a  auth`;
  }

  firstPage() {
    return `This action removes a  auth`;
  }
}
