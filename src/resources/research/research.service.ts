import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SearchDto } from './dto/search.dto';
import { ShowResearchResultDto } from './dto/show-research-result.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountEntity } from '../account/entities/account.entity';
import { Repository } from 'typeorm';
import { FunctionPrivilegeEnum } from 'src/enums/function.privilege.enum';
import { Utils } from 'src/generics/utils';
import { NotificationService } from 'src/resources/notification/notification.service';

@Injectable()
export class ResearchService extends Utils {
  constructor(
    @InjectRepository(AccountEntity)
    private readonly accountRepository: Repository<AccountEntity>,
    private readonly notificationService: NotificationService,

  ) {
    super();
  }

  async search(searchDto: SearchDto, account) {
    const userAccount = await this.accountRepository.findOneBy({
      refAccount: account.refAccount,
    });
    if (userAccount != null) {
      if (
        this.IsAuthorised(userAccount, FunctionPrivilegeEnum.SEARCH) == false
      ) {
        throw new UnauthorizedException();
      }
    }

    const textSearch: string = searchDto.text;

    if (searchDto.account != undefined) {
    }

    if (searchDto.post != undefined) {
    }

    if (searchDto.service != undefined) {
    }

    return textSearch;
  }

  async showResearchResult(
    showResearchResultDto: ShowResearchResultDto,
    account: AccountEntity,
  ) {
    const userAccount = await this.accountRepository.findOneBy({
      refAccount: account.refAccount,
    });
    if (userAccount != null) {
      if (
        this.IsAuthorised(
          userAccount,
          FunctionPrivilegeEnum.SHOW_RESEARCH_RESULT,
        ) == false
      ) {
        throw new UnauthorizedException();
      }
    }

    return await `This action returns all research`;
  }

  async showResearchDetail(refSearch: string, account: AccountEntity) {
    const userAccount = await this.accountRepository.findOneBy({
      refAccount: account.refAccount,
    });
    if (userAccount != null) {
      if (
        this.IsAuthorised(
          userAccount,
          FunctionPrivilegeEnum.SHOW_RESEARCH_DETAIL,
        ) == false
      ) {
        throw new UnauthorizedException();
      }
    }

    return await `This action returns a research`;
  }
}
