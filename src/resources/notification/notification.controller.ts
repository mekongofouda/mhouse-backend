import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  HttpStatus,
} from '@nestjs/common';
import { NotificationService } from './notification.service';
import { MarkReadedDto } from './dto/markReaded-notification.dto';
import { ListNotificationDto } from './dto/list-notification.dto';
import { JwtAuthGuard } from 'src/resources/account/auth/auth.guard';
import { MhouseResponseInterface } from 'src/interfaces/mhouse-response.interface';
import { AccountEntity } from '../account/entities/account.entity';
import { Account } from 'src/decorators/account.decorator';

@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async sendNotification(
    @Account() account: AccountEntity,
  ): Promise<MhouseResponseInterface> {
    const data = await this.notificationService.sendNotification(account);
    return {
      data: data,
      message: 'Notification envoyée avec succès',
      code: HttpStatus.OK,
    };
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async listNotification(
    @Query() listNotificationDto: ListNotificationDto,
    @Account() account: AccountEntity,
  ): Promise<MhouseResponseInterface> {
    const data = await this.notificationService.listNotification(
      listNotificationDto,
      account,
    );
    return {
      data: data,
      message: 'Discussion créée avec succès',
      code: HttpStatus.OK,
    };
  }

  @Get(':ref')
  @UseGuards(JwtAuthGuard)
  async showNotificationDetail(
    @Param('ref') ref: string,
    @Account() account: AccountEntity,
  ): Promise<MhouseResponseInterface> {
    const data = await this.notificationService.showNotificationDetail(
      ref,
      account,
    );
    return {
      data: data,
      message: 'Discussion créée avec succès',
      code: HttpStatus.OK,
    };
  }

  @Patch(':ref')
  @UseGuards(JwtAuthGuard)
  async markReaded(
    @Param('ref') ref: string,
    @Body() markReadedDto: MarkReadedDto,
    @Account() account: AccountEntity,
  ): Promise<MhouseResponseInterface> {
    const data = await this.notificationService.markReaded(
      ref,
      markReadedDto,
      account,
    );
    return {
      data: data,
      message: 'Discussion créée avec succès',
      code: HttpStatus.OK,
    };
  }

  @Delete(':ref')
  @UseGuards(JwtAuthGuard)
  async deleteNotification(
    @Param('ref') ref: string,
    @Account() account: AccountEntity,
  ): Promise<MhouseResponseInterface> {
    const data = await this.notificationService.deleteNotification(
      ref,
      account,
    );
    return {
      data: data,
      message: 'Discussion créée avec succès',
      code: HttpStatus.OK,
    };
  }
}
