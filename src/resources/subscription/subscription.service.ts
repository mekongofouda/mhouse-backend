import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SubscribeDto } from './dto/subscribe.dto';
import { Utils } from 'src/generics/utils';
import { AccountEntity } from '../account/entities/account.entity';
import { FunctionPrivilegeEnum } from 'src/enums/function.privilege.enum';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subscription } from './entities/subscription.entity';
import { ListSubscriptionDto } from './dto/list-subscription';
import { NotificationService } from 'src/resources/notification/notification.service';

@Injectable()
export class SubscriptionService extends Utils {
  constructor(
    @InjectRepository(AccountEntity)
    private readonly accountRepository: Repository<AccountEntity>,

    @InjectRepository(Subscription)
    private readonly subscriptionRepository: Repository<Subscription>,
    private readonly notificationService: NotificationService,
  ) {
    super();
  }

  async subscribe(subscribeDto: SubscribeDto, account: AccountEntity) {
    const userAccount = await this.accountRepository.findOneBy({
      refAccount: account.refAccount,
    });
    if (userAccount != null) {
      if (
        this.IsAuthorised(userAccount, FunctionPrivilegeEnum.UPGRADE) == false
      ) {
        throw new UnauthorizedException();
      }
    }
    await this.notificationService.sendNotification(account);

    return 'This action adds a new subscription';
  }

  async listSubscription(listSubscription: ListSubscriptionDto, account: AccountEntity) {
    const userAccount = await this.accountRepository.findOneBy({
      refAccount: account.refAccount,
    });
    if (userAccount != null) {
      if (
        this.IsAuthorised(userAccount, FunctionPrivilegeEnum.LIST_UPGRADING) ==
        false
      ) {
        throw new UnauthorizedException();
      }
    }

    return `This action returns all subscription`;
  }

  async showSubscriptionDetail(refSubscription: string, account: AccountEntity) {
    const userAccount = await this.accountRepository.findOneBy({
      refAccount: account.refAccount,
    });
    if (userAccount != null) {
      if (
        this.IsAuthorised(userAccount, FunctionPrivilegeEnum.SHOW_UPGRADING) ==
        false
      ) {
        throw new UnauthorizedException();
      }
    }

    return `This action returns a  subscription`;
  }
}
