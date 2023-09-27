import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginCredentialsDto } from './dto/login.credentials.dto';
import { JwtAuthGuard } from './auth.guard';
import { ReferencePipe } from 'src/pipes/reference/reference.pipe';
import { Account } from 'src/account/entities/account.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async login (
    @Body() credentials:LoginCredentialsDto 
    ) {
    return await this.authService.login(credentials);
  }

  // @Post()
  // async loginSocialAccount (
  //   @Body() credentials:LoginCredentialsDto 
  //   ) {
  //   return await this.authService.login(credentials);
  // }

  // @Get()
  // @UseGuards(JwtAuthGuard)
  // async logout() {
  //   return await this.authService.logout();
  // }

  // @Get()
  // showLegalMention() {
  //   return this.authService.showLegalMention();
  // }

  // @Get()
  // firstPage() {
  //   return this.authService.firstPage();
  // }

  @Post('register')
  async register(
    @Body(ReferencePipe) registerDto: RegisterDto
    ) : Promise<Account> {
    return this.authService.register(registerDto);
  }

  // @Post('register/account')
  // async registerSocialAccount(
  //   @Body(ReferencePipe) registerDto: RegisterDto
  //   ) : Promise<Account> {
  //   return this.authService.register(registerDto);
  // }

}
