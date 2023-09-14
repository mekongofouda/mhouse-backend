import { Injectable } from '@nestjs/common';
import { InviteUserDto } from './dto/invite-user.dto';
import { UpdateUserAccountDto } from './dto/update-user-account.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from './entities/account.entity';


@Injectable()
export class AccountService {

  constructor(
    @InjectRepository(Account) 
    private readonly accountRepository: Repository<Account>
  ){}

  invite(inviteUserDto: InviteUserDto) {
    return 'This action adds a new account';
  }

  listUserAccount() {
    return `This action returns all account`;
  }
  
  getUserDetail(name: string) {
    return this.accountRepository.findOneBy({name});
  }

  showUserProfile(reference: string) {
    return `This action returns a account`;
  }

  update(reference: string, updateUserAccountDto: UpdateUserAccountDto) {
    return `This action updates a account`;
  }

  remove(reference: string) {
    return `This action removes a account`;
  }
}
