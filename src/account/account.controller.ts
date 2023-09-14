import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AccountService } from './account.service';
import { InviteUserDto } from './dto/invite-user.dto';
import { UpdateUserAccountDto } from './dto/update-user-account.dto';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post()
  inviteUser(@Body() inviteUserDto: InviteUserDto) {
    return this.accountService.invite(inviteUserDto);
  }

  @Get()
  listUserAccount() {
    return this.accountService.listUserAccount();
  }

  @Get(':reference')
  showUserProfile(@Param('reference') reference: string) {
    return this.accountService.showUserProfile(reference);
  }

  @Patch(':reference')
  updateUserAccount(@Param('reference') reference: string, 
  @Body() updateUserAccountDto: UpdateUserAccountDto) {
    return this.accountService.update(reference, updateUserAccountDto);
  }

  @Delete(':reference')
  deleteUserAccount(@Param('reference') reference: string) {
    return this.accountService.remove(reference);
  }
}
