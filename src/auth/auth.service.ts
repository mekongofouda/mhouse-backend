import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { LoginCredentialsDto } from './dto/login.credentials.dto';
import { AccountService } from 'src/account/account.service';
import { JwtService } from '@nestjs/jwt';
import { Account } from 'src/account/entities/account.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt  from 'bcrypt';

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(Account) 
    private readonly accountRepository: Repository<Account>,
    private readonly jwtService: JwtService
    ){}

  async login(credentials: LoginCredentialsDto) {

    const {email, password} = credentials;

    const account = await this.accountRepository.createQueryBuilder('account')
    .where("account.email = :email", {email})
    .getOne();

    if(!account){
      throw new NotFoundException('Email ou password éroné! ')
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
      
      await this.accountRepository.save(account);

      return {
        'access_token': jwt,
        'payloads': payload
      }
    } else {
      throw new NotFoundException('Email ou password éroné! ')
    }
    return 
  }

  async logout() {
    return await `This action returns a auth`;
  }

  async register(registerDto: RegisterDto): Promise<Account> {

    //Get account to register  
    const account = this.accountRepository.create({
        ...registerDto
    });

    //Crypt datas
    account.salt = await bcrypt.genSalt();
    account.password = await bcrypt.hash(account.password, account.salt);
    
    //Persist account
    try {
      await this.accountRepository.save(account);
    } catch (error) {
      throw new ConflictException('L email et le numéro de téléphone doivent être uniques');
    }
    
    return account;
  }

  async firstPage() {
    //Vérifier si le compte est loggé dans le navigateur ou pas avec des cookies ou ... Si oui retouner "true"
    return await true ;
  }
}
