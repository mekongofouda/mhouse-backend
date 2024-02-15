import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  HttpStatus,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { AccountService } from './account.service';
import { InviteUserDto } from '../dto/invite-user.dto';
import { UpdateUserAccountDto } from '../dto/update-user-account.dto';
import { ListUserAccountDto } from '../dto/list-user-account.dto';
import { JwtAuthGuard } from 'src/resources/account/auth/auth.guard';
import { MhouseResponseInterface } from 'src/interfaces/mhouse-response.interface';
import { TransformResponseInterceptor } from 'src/interceptors/transform-response/transform-response.interceptor';
import { Account } from 'src/decorators/account.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { ReferencePipe } from 'src/pipes/reference/reference.pipe';
import { RegisterDto } from '../auth/dto/register.dto';
import { UserRoleEnum } from 'src/enums/role.enum';

// Disk storage for uploaded files
const storage = {
  storage: diskStorage({
    destination: '.uploads/profile-images',
    filename: (req, file, cb) => {
      const filename: string = file.originalname;
      cb(null, (`${filename}`));
    }
  })
}

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  /** Register super admin account function */
  @Post('register-sa')
  async registerSA(
    @Body(ReferencePipe) registerDto: RegisterDto
    ): Promise<MhouseResponseInterface> {
    const data = await this.accountService.register(registerDto, UserRoleEnum.SUPER_ADMIN);
    return {
      data: data,
      message: 'SUPER ADMIN created successfully',
      code: HttpStatus.OK,
    };
  }

  /** Register account function */
  @Post('register')
  async register(@Body(ReferencePipe) registerDto: RegisterDto): Promise<MhouseResponseInterface> {
    const data = await this.accountService.register(registerDto);
    return {
      data: data,
      message: 'Account created successfully',
      code: HttpStatus.OK,
    };
  }
  
  @Post()
  @UseGuards(JwtAuthGuard)
  async inviteUser(
    @Body() inviteUserDto: InviteUserDto,
    @Account() account,
  ): Promise<MhouseResponseInterface> {
    const data = await this.accountService.invite(inviteUserDto, account);
    return {
      data: data,
      message: 'Utilisateur invité avec succès',
      code: HttpStatus.OK,
    };
  }

  @Patch(':ref')
  @UseGuards(JwtAuthGuard)
  async updateUserAccount(
    @Param('ref') ref: string,
    @Body() updateUserAccountDto: UpdateUserAccountDto,
  ): Promise<MhouseResponseInterface> {
    const data = await this.accountService.updateUserAccount(
      ref,
      updateUserAccountDto,
    );
    return {
      data: data,
      message: 'Compte mis à jour avec succès',
      code: HttpStatus.OK,
    };
  }

  @Post('upload-avatar')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file', storage))
  async uploadAvatar(
    @UploadedFile() file, 
    @Account() account
    ): Promise<MhouseResponseInterface> {
    const data = await this.accountService.uploadAvatar(account, file);
    return {
      data: data,
      message: 'Avatar uploaded successufully',
      code: HttpStatus.OK,
    };
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(TransformResponseInterceptor)
  async listUserAccount(
    @Query() listUserAccountDto: ListUserAccountDto,
  ): Promise<MhouseResponseInterface> {
    const data = await this.accountService.listUserAccount(listUserAccountDto);
    return {
      data: data,
      message: 'Liste des comptes utilisateurs obtenue avec succès',
      code: HttpStatus.OK,
    };
  }

  @Get('home')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(TransformResponseInterceptor)
  async getHome(@Account() account): Promise<MhouseResponseInterface> {
    const data = await this.accountService.getHome(account);
    return {
      data: data,
      message: 'Informations pour la page home obtenues avec succès',
      code: HttpStatus.OK,
    };
  }

  @Get(':ref')
  @UseGuards(JwtAuthGuard)
  async showUserProfile(
    @Param('ref') ref: string,
  ): Promise<MhouseResponseInterface> {
    const data = await this.accountService.showUserProfile(ref);
    return {
      data: data,
      message: 'profil du compte obtenu avec succès',
      code: HttpStatus.OK,
    };
  }

  @Delete(':ref')
  @UseGuards(JwtAuthGuard)
  async deleteUserAccount(
    @Param('ref') ref: string,
  ): Promise<MhouseResponseInterface> {
    const data = await this.accountService.deleteUserAccount(ref);
    return {
      data: data,
      message: 'Compte supprimé avec succès',
      code: HttpStatus.OK,
    };
  }
}
