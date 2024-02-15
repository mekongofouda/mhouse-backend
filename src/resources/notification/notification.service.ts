import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { MarkReadedDto } from './dto/markReaded-notification.dto';
import { ListNotificationDto } from './dto/list-notification.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from './entities/notification.entity';
import { FunctionPrivilegeEnum } from 'src/enums/function.privilege.enum';
import { Utils } from 'src/generics/utils';
import { AccountEntity } from '../account/entities/account.entity';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class NotificationService extends Utils {
  constructor(
    @InjectRepository(AccountEntity)
    private readonly accountRepository: Repository<AccountEntity>,

    @InjectRepository(Notification)
    private readonly notificationRepository: Repository<Notification>,

    private mailerService: MailerService,
  ) {
    super();
  }

  async sendRegisterSANotification(account: AccountEntity, type?: string) {
    // create notification
    let notification = await this.notificationRepository.create();

    const userAccount = await this.accountRepository.findOneBy({
      refAccount: account.refAccount,
    });

    const subject = "Création du compte super administrateur";
    const description = "Votre compte super administrateur pour la plateform mHouse a été créé avec succès";
    const from = '"Support Team" <mhouse-support@example.com>';
    const template = './notification';
    const url = `example.com/auth`;    
    
    try {
      await this.mailerService.sendMail({
        to: account.email,
        from: from, // override default from
        subject: subject,
        template:template, // `.hbs` extension is appended automatically
        context: {
          reference: account.refAccount,
          name: account.name,
          subject: subject,
          description: description,
          url,
        },
      });
    } catch (error) {
      throw new ConflictException('Display automatically erro here: error.driverError.detail');
    }

    const date = new Date();
    const randNumber = Math.floor(Math.random() * 100);
    notification.refNotification = 'NTFS' +
    randNumber.toString() +
    date.getFullYear() +
    date.getMonth() +
    date.getDay() +
    date.getMonth() +
    date.getMinutes() +
    date.getSeconds();

    notification.subject = subject;
    if (type) {
      notification.type = type;
    } else {
      notification.type = "";
    }


    try {
      await this.notificationRepository.save(notification)
    } catch (error) {
      throw new ConflictException(error.driverError.detail);
    }

    return notification;
  }

  async sendNotification(account: AccountEntity, type?: string) {
    // create notification
    let notification = await this.notificationRepository.create();

    const userAccount = await this.accountRepository.findOneBy({
      refAccount: account.refAccount,
    });
    if (userAccount != null) {
      if (
        this.IsAuthorised(
          userAccount,
          FunctionPrivilegeEnum.SEND_NOTIFICATION,
        ) == false
      ) {
        throw new UnauthorizedException();
      }
    }

    const subject = "Subject";
    const description = "Description";
    const from = '"Support Team" <support@example.com>';
    const template = './notification';
    const url = `example.com/auth`;    
    
    try {
      await this.mailerService.sendMail({
        to: account.email,
        from: from, // override default from
        subject: subject,
        template:template, // `.hbs` extension is appended automatically
        context: {
          reference: account.refAccount,
          name: account.name,
          subject: subject,
          description: description,
          url,
        },
      });
    } catch (error) {
      throw new ConflictException(error.driverError.detail);
    }

    const date = new Date();
    const randNumber = Math.floor(Math.random() * 100);
    notification.refNotification = 'NTFS' +
    randNumber.toString() +
    date.getFullYear() +
    date.getMonth() +
    date.getDay() +
    date.getMonth() +
    date.getMinutes() +
    date.getSeconds();

    notification.subject = subject;
    if (type) {
      notification.type = type;
    } else {
      notification.type = "";
    }


    try {
      await this.notificationRepository.save(notification)
    } catch (error) {
      throw new ConflictException(error.driverError.detail);
    }

    return notification;
  }

  async sendRegisterNotification(account: AccountEntity, type?: string) {
    // create notification
    let notification = await this.notificationRepository.create();

    const userAccount = await this.accountRepository.findOneBy({
      refAccount: account.refAccount,
    });

    const subject = "Subject";
    const description = "Description";
    const from = '"Support Team" <support@example.com>';
    const template = './notification';
    const url = `example.com/auth`;    
    
    try {
      await this.mailerService.sendMail({
        to: account.email,
        from: from, // override default from
        subject: subject,
        template:template, // `.hbs` extension is appended automatically
        context: {
          reference: account.refAccount,
          name: account.name,
          subject: subject,
          description: description,
          url,
        },
      });
    } catch (error) {
      throw new ConflictException(error.driverError.detail);
    }

    const date = new Date();
    const randNumber = Math.floor(Math.random() * 100);
    notification.refNotification = 'NTFS' +
    randNumber.toString() +
    date.getFullYear() +
    date.getMonth() +
    date.getDay() +
    date.getMonth() +
    date.getMinutes() +
    date.getSeconds();

    notification.subject = subject;
    if (type) {
      notification.type = type;
    } else {
      notification.type = "";
    }


    try {
      await this.notificationRepository.save(notification)
    } catch (error) {
      throw new ConflictException(error.driverError.detail);
    }

    return notification;
  }

  async sendFollowerNotification(account: AccountEntity) {
    const userAccount = await this.accountRepository.findOneBy({
      refAccount: account.refAccount,
    });
    if (userAccount != null) {
      if (
        this.IsAuthorised(
          userAccount,
          FunctionPrivilegeEnum.SEND_NOTIFICATION,
        ) == false
      ) {
        throw new UnauthorizedException();
      }
    }

    const url = `example.com/auth`;

    await this.mailerService.sendMail({
      to: account.email,
      from: '"Support Team" <support@example.com>', // override default from
      subject: 'Welcome to Nice App! Confirm your Email',
      template: './notification', // `.hbs` extension is appended automatically
      context: {
        name: account.name,
        url,
      },
    });

    return 'This action adds a new notification';
  }

  async listNotification(
    listNotificationDto: ListNotificationDto,
    account: AccountEntity,
  ): Promise<Notification[]> {
    const userAccount = await this.accountRepository.findOneBy({
      refAccount: account.refAccount,
    });
    if (userAccount != null) {
      if (
        this.IsAuthorised(
          userAccount,
          FunctionPrivilegeEnum.LIST_NOTIFICATION,
        ) == false
      ) {
        throw new UnauthorizedException();
      }
    }

    return await this.notificationRepository.find();
  }

  async showNotificationDetail(
    refNotification: string,
    account: AccountEntity,
  ) {
    const userAccount = await this.accountRepository.findOneBy({
      refAccount: account.refAccount,
    });
    if (userAccount != null) {
      if (
        this.IsAuthorised(
          userAccount,
          FunctionPrivilegeEnum.SHOW_NOTIFICATION,
        ) == false
      ) {
        throw new UnauthorizedException();
      }
    }

    return `This action returns a #${refNotification} notification`;
  }

  async markReaded(
    refNotification: string,
    markReadedDto: MarkReadedDto,
    account: AccountEntity,
  ) {
    const userAccount = await this.accountRepository.findOneBy({
      refAccount: account.refAccount,
    });
    if (userAccount != null) {
      if (
        this.IsAuthorised(userAccount, FunctionPrivilegeEnum.MARK_READED) ==
        false
      ) {
        throw new UnauthorizedException();
      }
    }

    const notification = await this.notificationRepository.findOneBy({
      refNotification: refNotification,
    });
    if (notification == null) {
      throw new HttpException('Notification not found', HttpStatus.NOT_FOUND);
    }

    return notification;
  }

  async deleteNotification(refNotification: string, account: AccountEntity) {
    const userAccount = await this.accountRepository.findOneBy({
      refAccount: account.refAccount,
    });
    if (userAccount != null) {
      if (
        this.IsAuthorised(
          userAccount,
          FunctionPrivilegeEnum.DELETE_NOTIFICATION,
        ) == false
      ) {
        throw new UnauthorizedException();
      }
    }

    const notification = await this.notificationRepository.findOneBy({
      refNotification: refNotification,
    });
    if (notification == null) {
      throw new HttpException('Notification not found', HttpStatus.NOT_FOUND);
    }

    return notification;
  }
}
