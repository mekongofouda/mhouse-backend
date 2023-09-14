import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register-auth.dto';
import { LoginDto } from './dto/login-auth.dto';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  login(@Body() loginDto:LoginDto) {
    return this.authService.login(loginDto);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Get()
  logout() {
    return this.authService.logout();
  }

  @Post()
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Get()
  showLegalMention() {
    return this.authService.showLegalMention();
  }

  @Get()
  firstPage() {
    return this.authService.firstPage();
  }
}
