import {
  Controller,
  Post,
  Get,
  Body,
  UseGuards,
  HttpStatus,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginCredentialsDto } from './dto/login.credentials.dto';
import { JwtAuthGuard } from './auth.guard';
import { MhouseResponseInterface } from 'src/interfaces/mhouse-response.interface';
import { AuthGuard } from '@nestjs/passport';
import { CredentialsPipe } from 'src/pipes/credentials/credentials.pipe';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async login(
    @Body(CredentialsPipe) credentials: LoginCredentialsDto,
  ): Promise<MhouseResponseInterface> {
    const data = await this.authService.login(credentials);
    return {
      data: data,
      message: 'Login effectué avec succès',
      code: HttpStatus.OK,
    };
  }

  /** Signin with facebook functions */
  @Get('facebook')
  @UseGuards(AuthGuard('facebook'))
  async facebookLogin(): Promise<any> {
    return HttpStatus.OK;
  }

  @Get('facebook/redirect')
  @UseGuards(AuthGuard('facebook'))
  async facebookLoginRedirect(@Req() req: Request): Promise<any> {
    return {
      data: req,
      statusCode: HttpStatus.OK,
    };
  }

  /** Signin with google functions */
  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) {}

  @Get('google/redirect')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Req() req) {
    return this.authService.googleLogin(req);
  }

  /** Logout function */
  @Get()
  @UseGuards(JwtAuthGuard)
  async logout(): Promise<MhouseResponseInterface> {
    const data = await this.authService.logout();
    return {
      data: data,
      message: 'Logout effectué avec succès',
      code: HttpStatus.OK,
    };
  }
}
