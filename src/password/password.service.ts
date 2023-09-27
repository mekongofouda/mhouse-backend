import { Injectable } from '@nestjs/common';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { ValidateResetAdressDto } from './dto/validate-reset-adress.dto';
import { ValidateResetCodeDto } from './dto/validate-reset-code.dto';

@Injectable()
export class PasswordService {

  resetPassword(resetPasswordDto: ResetPasswordDto) {
    return 'This action adds a new password';
  }

  validateResetAdress(validateResetAdressDto: ValidateResetAdressDto) {
    return 'This action adds a new password';
  }

  validateResetCode(validateResetCodeDto: ValidateResetCodeDto) {
    return 'This action adds a new password';
  }

  updatePassword(id: number, updatePasswordDto: UpdatePasswordDto) {
    return `This action updates a #${id} password`;
  }

}
