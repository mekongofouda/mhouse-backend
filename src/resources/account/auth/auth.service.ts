import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { LoginCredentialsDto } from './dto/login.credentials.dto';
import { JwtService } from '@nestjs/jwt';
import { AccountEntity } from 'src/resources/account/entities/account.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Utils } from 'src/generics/utils';

@Injectable()
export class AuthService extends Utils {
  constructor(
    @InjectRepository(AccountEntity)
    private readonly accountRepository: Repository<AccountEntity>,
    private readonly jwtService: JwtService
  ) {
    super()
  }

  /** Login function */
  async login(credentials: LoginCredentialsDto) {
    // Get user credentials
    const { email, password } = credentials;
    const account = await this.accountRepository
      .createQueryBuilder('account')
      .where('account.email = :email', { email })
      .getOne();
    if (!account) {
      throw new NotFoundException('Email invalide');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, account.salt);
    if (hashedPassword == account.password) {
      const payload = {
        name: account.name,
        email: account.email,
        password: account.password,
      };

      // Create token for the account
      const jwt = await this.jwtService.sign(payload);
      account.token = jwt;

      // Save account in database
      try {
        await this.accountRepository.save(account);
      } catch (error) {
        throw new ConflictException(error.driverError.detail);
      }

      return {
        access_token: jwt,
        payloads: payload,
      };
    } else {
      throw new NotFoundException('Password invalide');
    }
  }

  async logout() {
    return await `This action returns a auth`;
  }

  googleLogin(req) {
    if (!req.user) {
      return 'No user from google';
    }

    return {
      message: 'User information from google',
      user: req.user,
    };
  }
}
