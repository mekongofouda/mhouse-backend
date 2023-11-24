import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UpgradeDto } from './dto/upgrade.dto';
import { Utils } from 'src/generics/utils';
import { AccountEntity } from '../account/entities/account.entity';
import { FunctionPrivilegeEnum } from 'src/enums/function.privilege.enum';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Upgrading } from './entities/upgrading.entity';
import { ListUpgradingDto } from './dto/list-upgrade.copy';

@Injectable()
export class UpgradingService extends Utils {

  constructor(  

    @InjectRepository(AccountEntity) 
    private readonly accountRepository: Repository<AccountEntity>,

    @InjectRepository(Upgrading) 
    private readonly upgradingRepository: Repository<Upgrading>

  ){
    super()
  }

  async upgrade(upgradeDto: UpgradeDto, account: AccountEntity) {

    const userAccount = await this.accountRepository.findOneBy({refAccount: account.refAccount});
    if(userAccount != null) {
      if (this.IsAuthorised(userAccount, FunctionPrivilegeEnum.ADD_DISCUSSION) == false) {
        throw new UnauthorizedException();
      }
    }

    return 'This action adds a new upgrading';
  }

  async listUpgrading(listUpgrading: ListUpgradingDto, account: AccountEntity) {

    const userAccount = await this.accountRepository.findOneBy({refAccount: account.refAccount});
    if(userAccount != null) {
      if (this.IsAuthorised(userAccount, FunctionPrivilegeEnum.ADD_DISCUSSION) == false) {
        throw new UnauthorizedException();
      }
    }

    return `This action returns all upgrading`;
  }

  async showUpgradingDetail(refUpgrading: string, account: AccountEntity) {

    const userAccount = await this.accountRepository.findOneBy({refAccount: account.refAccount});
    if(userAccount != null) {
      if (this.IsAuthorised(userAccount, FunctionPrivilegeEnum.ADD_DISCUSSION) == false) {
        throw new UnauthorizedException();
      }
    }

    return `This action returns a  upgrading`;
  }

}
