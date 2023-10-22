import { Controller, Post, Get, Body, UseGuards, HttpStatus, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginCredentialsDto } from './dto/login.credentials.dto';
import { JwtAuthGuard } from './auth.guard';
import { ReferencePipe } from 'src/pipes/reference/reference.pipe';
import { AccountEntity } from 'src/resources/account/entities/account.entity';
import { RegisterAdminDto } from './dto/register-admin.dto';
import { MhouseResponseInterface } from 'src/interfaces/mhouse-response.interface';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async login (
    @Body() credentials:LoginCredentialsDto 
    ): Promise<MhouseResponseInterface> {
    const data = await this.authService.login(credentials);
    return {
      data: data,
      message: "Login effectué avec succès",
      code: HttpStatus.OK
    };
  }

  @Post('register')
  async register(
    @Body(ReferencePipe) registerDto: RegisterDto
    ) : Promise<MhouseResponseInterface> {
    const data = await this.authService.register(registerDto);
    return {
      data: data,
      message: "Your account has been created successufully",
      code: HttpStatus.OK
    };
  }
  
  @Get('facebook')
  @UseGuards(AuthGuard('facebook'))
  async facebookLogin(): Promise<any> {
    return HttpStatus.OK;
  }

  @Get('facebook/redirect')
  @UseGuards(AuthGuard("facebook"))
  async facebookLoginRedirect(
    @Req() req: Request): Promise<any> {
    return {
      statusCode: HttpStatus.OK,
      data: req,
    };
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(
    @Req() req
    ) {

    }

  @Get('google/redirect')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(
    @Req() req
    ) {
    return this.authService.googleLogin(req)
  }
  // @Get()
  // @UseGuards(JwtAuthGuard)
  // async logout() {
  //   return await this.authService.logout();
  // }


  // @Post('register/account')
  // async registerSocialAccount(
  //   @Body(ReferencePipe) registerDto: RegisterDto
  //   ) : Promise<AccountEntity> {
  //   return this.authService.register(registerDto);
  // }

}
