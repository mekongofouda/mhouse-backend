import { 
  Controller, 
  Post, 
  Get, 
  Body, 
  UseGuards, 
  HttpStatus, 
  Req, 
  UseInterceptors, 
  UploadedFile 
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginCredentialsDto } from './dto/login.credentials.dto';
import { JwtAuthGuard } from './auth.guard';
import { ReferencePipe } from 'src/pipes/reference/reference.pipe';
import { MhouseResponseInterface } from 'src/interfaces/mhouse-response.interface';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('auth')
export class AuthController {
  constructor(
  private readonly authService: AuthService) {}

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
  @UseInterceptors(FileInterceptor('avatar'))
  async register(
    @Body(ReferencePipe) registerDto: RegisterDto,
    @UploadedFile() file: Express.Multer.File
    ) 
    // : Promise<MhouseResponseInterface> 
    {
      console.log(file);
    // const data = await this.authService.register(registerDto);
    // return {
    //   data: data,
    //   message: "Your account has been created successufully",
    //   code: HttpStatus.OK
    // };
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
      data: req,
      statusCode: HttpStatus.OK
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
  
  @Get()
  @UseGuards(JwtAuthGuard)
  async logout(): Promise<MhouseResponseInterface> {
    const data = await this.authService.logout();
    return {
      data: data,
      message: "Logout effectué avec succès",
      code: HttpStatus.OK
    };
  }
  
}
