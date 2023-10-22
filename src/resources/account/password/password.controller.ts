import { Controller, Post, Body, Patch, Param, UseGuards, HttpStatus } from '@nestjs/common';
import { PasswordService } from './password.service';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { ValidateResetAdressDto } from './dto/validate-reset-adress.dto';
import { ValidateResetCodeDto } from './dto/validate-reset-code.dto';
import { JwtAuthGuard } from 'src/resources/account/auth/auth.guard';
import { MhouseResponseInterface } from 'src/interfaces/mhouse-response.interface';

@Controller('password')
export class PasswordController {
  constructor(private readonly passwordService: PasswordService) {}

  @Post()
  async resetPassword(
    @Body() resetPasswordDto: ResetPasswordDto
    ): Promise<MhouseResponseInterface> {
    const data = await this.passwordService.resetPassword(resetPasswordDto);
    return {
      data: data,
      message: "Mot de passe mis à jour avec succès",
      code: HttpStatus.OK
    }
  }

  @Post('adress')
  async validateResetAdress(
    @Body() validateResetAdressDto: ValidateResetAdressDto
    ): Promise<MhouseResponseInterface> {
    const data = await this.passwordService.validateResetAdress(validateResetAdressDto);
    return {
      data: data,
      message: "Email validé",
      code: HttpStatus.OK
    }
  }

  @Post('code')
  async validateResetCode(
    @Body() validateResetCodeDto: ValidateResetCodeDto
    ): Promise<MhouseResponseInterface> {
    const data = await this.passwordService.validateResetCode(validateResetCodeDto);
    return {
      data: data,
      message: "Code validé",
      code: HttpStatus.OK
    }
  }

  @Patch(':ref')
  @UseGuards(JwtAuthGuard)
  async updatePassword(
    @Param('ref') ref: string, 
    @Body() updatePasswordDto: UpdatePasswordDto
    ): Promise<MhouseResponseInterface> {
    const data = await this.passwordService.updatePassword(ref, updatePasswordDto);
    return {
      data: data,
      message: "Code validé",
      code: HttpStatus.OK
    };
  }

}
