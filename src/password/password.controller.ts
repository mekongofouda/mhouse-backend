import { Controller, Post, Body, Patch, Param, UseGuards } from '@nestjs/common';
import { PasswordService } from './password.service';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { ValidateResetAdressDto } from './dto/validate-reset-adress.dto';
import { ValidateResetCodeDto } from './dto/validate-reset-code.dto';
import { JwtAuthGuard } from 'src/auth/auth.guard';

@Controller('password')
export class PasswordController {
  constructor(private readonly passwordService: PasswordService) {}

  @Post()
  async resetPassword(
    @Body() resetPasswordDto: ResetPasswordDto
    ) {
    return await this.passwordService.resetPassword(resetPasswordDto);
  }

  @Post('adress')
  async validateResetAdress(
    @Body() validateResetAdressDto: ValidateResetAdressDto
    ) {
    return await this.passwordService.validateResetAdress(validateResetAdressDto);
  }

  @Post('code')
  async validateResetCode(
    @Body() validateResetCodeDto: ValidateResetCodeDto
    ) {
    return await this.passwordService.validateResetCode(validateResetCodeDto);
  }

  // @Patch(':id')
  // @UseGuards(JwtAuthGuard)
  // async updatePassword(
  //   @Param('id') id: string, 
  //   @Body() updatePasswordDto: UpdatePasswordDto
  //   ) {
  //   return await this.passwordService.updatePassword(+id, updatePasswordDto);
  // }

}
