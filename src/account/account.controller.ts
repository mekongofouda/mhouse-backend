import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { AccountService } from './account.service';
import { InviteUserDto } from './dto/invite-user.dto';
import { UpdateUserAccountDto } from './dto/update-user-account.dto';
import { ListUserAccountDto } from './dto/list-user-account.dto';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { Account } from './entities/account.entity';
import { Roles } from 'src/decorators/roles.decorator';
import { UserRoleEnum } from 'src/enums/user-role.enum';

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
  @Roles(UserRoleEnum.CUSTOMER)
  async listUserAccount(
    @Query() listUserAccountDto: ListUserAccountDto
  ): Promise<Account[]> {
    return await this.accountService.listUserAccount(listUserAccountDto);
  }

  @Get(':ref')
  @UseGuards(JwtAuthGuard)
  async showUserProfile(
    @Param('ref') ref: string
    ): Promise<Account> {
    return await this.accountService.showUserProfile(ref);
  }

  @Patch(':ref')
  @UseGuards(JwtAuthGuard)
  async updateUserAccount(
    @Param('ref') ref: string, 
  @Body() updateUserAccountDto: UpdateUserAccountDto
  ): Promise<Account> {
    return await this.accountService.updateUserAccount(ref, updateUserAccountDto);
  }

  @Delete(':ref')
  @UseGuards(JwtAuthGuard)
  async deleteUserAccount(
    @Param('ref') ref: string
    ): Promise<Account> {
    return await this.accountService.deleteUserAcoount(ref);
  }
}
