import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { ValidateResetAdressDto } from './dto/validate-reset-adress.dto';
import { ValidateResetCodeDto } from './dto/validate-reset-code.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountEntity } from 'src/resources/account/entities/account.entity';
import { Repository } from 'typeorm';
import { randomInt } from 'crypto';
import * as bcrypt from 'bcrypt';
import { FunctionPrivilegeEnum } from 'src/enums/function.privilege.enum';
import { Utils } from 'src/generics/utils';

@Injectable()
export class PasswordService extends Utils {
  notificationService: any;
  constructor(
    @InjectRepository(AccountEntity)
    private readonly accountRepository: Repository<AccountEntity>,
  ) {
    super();
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto) {
    if (resetPasswordDto.password != resetPasswordDto.passwordConfirmed) {
      throw new ConflictException('Password confirmation doesnt match');
    }

    //Get account witch has the valid resetCode
    const account = await this.accountRepository.findOneBy({
      resetCode: resetPasswordDto.validCode,
    });
    if (!account) {
      throw new HttpException('Account not found', HttpStatus.NOT_FOUND);
    }

    //Crypt datas
    account.salt = await bcrypt.genSalt();
    account.password = await bcrypt.hash(
      resetPasswordDto.password,
      account.salt,
    );

    //Set properties
    account.resetCode = null;

    try {
      await this.accountRepository.save(account);
    } catch (error) {
      throw new ConflictException(
        "L'email et le numéro de téléphone doivent être déjà utilisés",
      );
    }
    return account;
  }

  async validateResetAdress(validateResetAdressDto: ValidateResetAdressDto) {
    //Find an account with the resetAdress
    const account = await this.accountRepository.findOneBy({
      email: validateResetAdressDto.email,
    });
    if (!account) {
      throw new HttpException('Account not found', HttpStatus.NOT_FOUND);
    }

    //Generate reset code
    const resetCode = randomInt(10000, 19999);

    //Set properties
    account.resetCode = resetCode;

    try {
      await this.accountRepository.save(account);
    } catch (error) {
      throw new ConflictException(
        "L'email et le numéro de téléphone doivent être déjà utilisés",
      );
    }
    return account;
  }

  async validateResetCode(validateResetCodeDto: ValidateResetCodeDto) {
    //Find account with the valid email
    const account = await this.accountRepository.findOneBy({
      email: validateResetCodeDto.validEmail,
    });
    if (!account) {
      throw new HttpException('Account not found', HttpStatus.NOT_FOUND);
    }

    //Test the given resetCode is the same resetCode of the account
    if (account.resetCode != validateResetCodeDto.resetCode) {
      throw new HttpException('resetCode éroné', HttpStatus.NOT_FOUND);
    }

    return account;
  }

  async updatePassword(
    refAccount: string,
    updatePasswordDto: UpdatePasswordDto,
  ) {
    const userAccount = await this.accountRepository.findOneBy({
      refAccount: refAccount,
    });
    if (userAccount != null) {
      if (
        this.IsAuthorised(userAccount, FunctionPrivilegeEnum.UPDATE_PASSWORD) ==
        false
      ) {
        throw new UnauthorizedException();
      }
    }

    if (updatePasswordDto.password == updatePasswordDto.passwordConfirmed) {
      userAccount.password = await bcrypt.hash(
        updatePasswordDto.password,
        userAccount.salt,
      );
    } else {
      throw new ConflictException('Passwords does not match');
    }

    try {
      await this.accountRepository.save(userAccount);
    } catch (error) {
      throw new ConflictException(error.driverError.detail);
    }
    await this.notificationService.sendNotification(userAccount);
    return userAccount;
  }
}
