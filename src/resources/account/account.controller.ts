import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, Sse, HttpStatus, UseInterceptors } from '@nestjs/common';
import { AccountService } from './account.service';
import { InviteUserDto } from './dto/invite-user.dto';
import { UpdateUserAccountDto } from './dto/update-user-account.dto';
import { ListUserAccountDto } from './dto/list-user-account.dto';
import { JwtAuthGuard } from 'src/resources/account/auth/auth.guard';
import { MhouseResponseInterface } from 'src/interfaces/mhouse-response.interface';
import { TransformResponseInterceptor } from 'src/interceptors/transform-response/transform-response.interceptor';

@Controller('account')
export class AccountController {

  constructor(
    private readonly accountService: AccountService
    ) {}

//   @Post()
//   @UseGuards(JwtAuthGuard)
//   async inviteUser(
//     @Body() inviteUserDto: InviteUserDto,
    
//     ) {
//     const data = await this.accountService.invite(inviteUserDto);
//     return {
//       data: data,
//       message: "Liste des comptes obtenue avec succès",
//       code: HttpStatus.OK
//     };
//   }

  @Get()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(TransformResponseInterceptor)
  async listUserAccount(
    @Query() listUserAccountDto: ListUserAccountDto
  ): Promise<MhouseResponseInterface> {
    const data = await this.accountService.listUserAccount(listUserAccountDto);
    return {
      data: data,
      message: "Liste des comptes utilisateurs obtenue avec succès",
      code: HttpStatus.OK
    }
  }

  @Get(':ref')
  @UseGuards(JwtAuthGuard)
  async showUserProfile(
    @Param('ref') ref: string
    ): Promise<MhouseResponseInterface> {
    const data = await this.accountService.showUserProfile(ref);
    return {
      data: data,
      message: "profil du compte obtenu avec succès",
      code: HttpStatus.OK
    };
  }

  @Patch(':ref')
  @UseGuards(JwtAuthGuard)
  async updateUserAccount(
    @Param('ref') ref: string, 
  @Body() updateUserAccountDto: UpdateUserAccountDto
  ): Promise<MhouseResponseInterface> {
    const data = await this.accountService.updateUserAccount(ref, updateUserAccountDto);
    return {
      data: data,
      message: "Compte mis à jour avec succès",
      code: HttpStatus.OK
    };
  }

  @Delete(':ref')
  @UseGuards(JwtAuthGuard)
  async deleteUserAccount(
    @Param('ref') ref: string
    ): Promise<MhouseResponseInterface> {
    const data = await this.accountService.deleteUserAcoount(ref);
    return {
      data: data,
      message: "Compte supprimé avec succès",
      code: HttpStatus.OK
    };
  }
}
