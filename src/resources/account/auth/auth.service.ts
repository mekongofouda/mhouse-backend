import { ConflictException, HttpException, HttpStatus, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { LoginCredentialsDto } from './dto/login.credentials.dto';
import { JwtService } from '@nestjs/jwt';
import { AccountEntity } from 'src/resources/account/entities/account.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt  from 'bcrypt';
import { Role } from 'src/resources/role/entities/role.entity';

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(AccountEntity) 
    private readonly accountRepository: Repository<AccountEntity>,

    @InjectRepository(Role) 
    private readonly roleRepository: Repository<Role>,

    private readonly jwtService: JwtService
    ){}

  async login(credentials: LoginCredentialsDto) {

    const {email, password} = credentials;
    const account = await this.accountRepository.createQueryBuilder('account')
    .where("account.email = :email", {email})
    .getOne();

    if(!account){
      throw new NotFoundException('Email invalide ')
    }

    const hashedPassword = await bcrypt.hash(password, account.salt);
    if (hashedPassword == account.password) {
      const payload = {
        name: account.name,
        email: account.email,
        password: account.password
      }

      const jwt = await this.jwtService.sign(payload);
      account.token = jwt;
      
      try {
        await this.accountRepository.save(account);
      } catch (error) {
        throw new ConflictException(error.driverError.detail);
      }
  
      return {
        'access_token': jwt,
        'payloads': payload
      }
    } else {
      throw new NotFoundException('Password invalide');
    }
  }

  async register(registerDto: RegisterDto): Promise<AccountEntity> {
    
    //Get role to add at the account  
    let role = null;

    switch (registerDto.accountType) {
      case "admin":
        role = await this.roleRepository.findOneBy({slug:"ADMIN"});
        if (!role) {
            throw new HttpException("Role not found, Your administrator has to create administrator's role before you register", HttpStatus.NOT_FOUND);
        }
        break;
      case "customer":
        role = await this.roleRepository.findOneBy({slug:"CUSTOMER"});
        if (!role) {
          throw new HttpException("Role not found, Your administrator has to create customer's role before you register", HttpStatus.NOT_FOUND);
        }
      break;
      default:
        throw new HttpException("Account type not found", HttpStatus.NOT_FOUND);

    }

    //Create the account object whit dto to save it  
    const account = await this.accountRepository.create({
        ...registerDto
    });

    //Crypt personnal datas
    account.salt = await bcrypt.genSalt();
    account.password = await bcrypt.hash(account.password, account.salt);

    //Add the account's role
    account.role = role;

    //Persist account
    try {
      await this.accountRepository.save(account);
    } catch (error) {
      throw new ConflictException(error.driverError.detail);
    }

    return account;
  }
  
  googleLogin(req) {
    if (!req.user) {
      return 'No user from google'
    }

    return {
      message: 'User information from google',
      user: req.user
    }
  }
  // async logout() {
  //   return await `This action returns a auth`;
  // }

}
