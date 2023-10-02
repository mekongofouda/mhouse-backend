import { ConflictException, HttpException, HttpStatus, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { LoginCredentialsDto } from './dto/login.credentials.dto';
import { AccountService } from 'src/account/account.service';
import { JwtService } from '@nestjs/jwt';
import { AccountEntity } from 'src/account/entities/account.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt  from 'bcrypt';
import { Role } from 'src/role/entities/role.entity';
import { RegisterAdminDto } from './dto/register-admin.dto';

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

  async register(registerDto: RegisterDto): Promise<AccountEntity> {
    //Get role to add at the account  
    const role = await this.roleRepository.findOneBy({refRole:"RROL3020238581727"});
    if (!role) {
      throw new HttpException("Role not found", HttpStatus.NOT_FOUND);
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
      throw new ConflictException("L'email et le numéro de téléphone doivent être déjà utilisés");
    }

    return account;
  }

  async registerAdmin(registerAdminDto: RegisterAdminDto): Promise<AccountEntity> {

    const refRole = registerAdminDto.refRole;
    let role;
    try {
        role = await this.roleRepository.findOneBy({refRole});
    } catch (error) {
        throw new HttpException("Role not found", HttpStatus.NOT_FOUND);
    }

    //Get account to register  
    const account = this.accountRepository.create({
      ...registerAdminDto
    });

    //Crypt datas
    account.salt = await bcrypt.genSalt();
    account.password = await bcrypt.hash(account.password, account.salt);
    account.role = role;

    //Persist account
    try {
      await this.accountRepository.save(account);
    } catch (error) {
      throw new ConflictException("L'email et le numéro de téléphone doivent être déjà utilisés");
    }
    
    return account;
  }

  // async firstPage() {
  //   //Vérifier si le compte est loggé dans le navigateur ou pas avec des cookies ou ... Si oui retouner "true"
  //   return await true ;
  // }
}
