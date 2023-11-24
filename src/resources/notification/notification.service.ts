import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SendNotificationDto } from './dto/send-notification.dto';
import { MarkReadedDto } from './dto/markReaded-notification.dto';
import { ListNotificationDto } from './dto/list-notification.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from './entities/notification.entity';
import { FunctionPrivilegeEnum } from 'src/enums/function.privilege.enum';
import { Utils } from 'src/generics/utils';
import { AccountEntity } from '../account/entities/account.entity';

@Injectable()
export class NotificationService extends Utils {

  constructor(

    @InjectRepository(AccountEntity) 
    private readonly accountRepository: Repository<AccountEntity>,

    @InjectRepository(Notification) 
    private readonly notificationRepository: Repository<Notification>
  ){
    super()
  }

  async sendNotification(sendNotificationDto: SendNotificationDto, account: AccountEntity) {

    const userAccount = await this.accountRepository.findOneBy({refAccount: account.refAccount});
    if(userAccount != null) {
      if (this.IsAuthorised(userAccount, FunctionPrivilegeEnum.ADD_DISCUSSION) == false) {
        throw new UnauthorizedException();
      }
    }

    return 'This action adds a new notification';
  }

  async listNotification(listNotificationDto: ListNotificationDto, account: AccountEntity): Promise<Notification[]>{

    const userAccount = await this.accountRepository.findOneBy({refAccount: account.refAccount});
    if(userAccount != null) {
      if (this.IsAuthorised(userAccount, FunctionPrivilegeEnum.ADD_DISCUSSION) == false) {
        throw new UnauthorizedException();
      }
    }

    return await this.notificationRepository.find();
  }

  async showNotificationDetail(refNotification: string, account: AccountEntity) {
    
    const userAccount = await this.accountRepository.findOneBy({refAccount: account.refAccount});
    if(userAccount != null) {
      if (this.IsAuthorised(userAccount, FunctionPrivilegeEnum.ADD_DISCUSSION) == false) {
        throw new UnauthorizedException();
      }
    }

    return `This action returns a #${refNotification} notification`;
  }

  async markReaded(refNotification: string, markReadedDto: MarkReadedDto, account: AccountEntity) {

    const userAccount = await this.accountRepository.findOneBy({refAccount: account.refAccount});
    if(userAccount != null) {
      if (this.IsAuthorised(userAccount, FunctionPrivilegeEnum.ADD_DISCUSSION) == false) {
        throw new UnauthorizedException();
      }
    }

    return `This action updates a #${refNotification} notification`;
  }

  async deleteNotification(refNotification: string, account: AccountEntity) {

    const userAccount = await this.accountRepository.findOneBy({refAccount: account.refAccount});
    if(userAccount != null) {
      if (this.IsAuthorised(userAccount, FunctionPrivilegeEnum.ADD_DISCUSSION) == false) {
        throw new UnauthorizedException();
      }
    }

    return `This action removes a #${refNotification} notification`;
  }
}
