import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { AccountService } from './account.service';
import { InviteUserDto } from './dto/invite-user.dto';
import { UpdateUserAccountDto } from './dto/update-user-account.dto';
import { ListUserAccountDto } from './dto/list-user-account.dto';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { AccountEntity } from './entities/account.entity';

@Controller('account')
export class AccountController {

  constructor(
    private readonly accountService: AccountService
    ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async inviteUser(
    @Body() inviteUserDto: InviteUserDto
    ) {
    return await this.accountService.invite(inviteUserDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async listUserAccount(
    @Query() listUserAccountDto: ListUserAccountDto
  ): Promise<AccountEntity[]> {
    return await this.accountService.listUserAccount(listUserAccountDto);
  }

  @Get(':ref')
  @UseGuards(JwtAuthGuard)
  async showUserProfile(
    @Param('ref') ref: string
    ): Promise<AccountEntity> {
    return await this.accountService.showUserProfile(ref);
  }

  @Patch(':ref')
  @UseGuards(JwtAuthGuard)
  async updateUserAccount(
    @Param('ref') ref: string, 
  @Body() updateUserAccountDto: UpdateUserAccountDto
  ): Promise<AccountEntity> {
    return await this.accountService.updateUserAccount(ref, updateUserAccountDto);
  }

  @Delete(':ref')
  @UseGuards(JwtAuthGuard)
  async deleteUserAccount(
    @Param('ref') ref: string
    ): Promise<AccountEntity> {
    return await this.accountService.deleteUserAcoount(ref);
  }
}
