import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  HttpStatus,
  UseGuards,
  Query,
} from '@nestjs/common';
import { SubscriptionService } from './subscription.service';
import { SubscribeDto } from './dto/subscribe.dto';
import { JwtAuthGuard } from '../account/auth/auth.guard';
import { Account } from 'src/decorators/account.decorator';
import { ReferencePipe } from 'src/pipes/reference/reference.pipe';
import { ListSubscriptionDto } from './dto/list-subscription';
import { MhouseResponseInterface } from 'src/interfaces/mhouse-response.interface';

@Controller('subscription')
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async upgrade(
    @Body(ReferencePipe) subscribeDto: SubscribeDto,
    @Account() account,
  ): Promise<MhouseResponseInterface> {
    const data = await this.subscriptionService.subscribe(subscribeDto, account);
    return {
      data: data,
      message: 'Service créé avec succès',
      code: HttpStatus.OK,
    };
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async listSubscription(
    @Query() listSubscriptionDto: ListSubscriptionDto,
    @Account() account,
  ): Promise<MhouseResponseInterface> {
    const data = await this.subscriptionService.listSubscription(
      listSubscriptionDto,
      account,
    );
    return {
      data: data,
      message: 'Service créé avec succès',
      code: HttpStatus.OK,
    };
  }

  @Get(':ref')
  @UseGuards(JwtAuthGuard)
  async showSubscriptionDetail(
    @Param('ref') ref: string,
    @Account() account,
  ): Promise<MhouseResponseInterface> {
    const data = await this.subscriptionService.showSubscriptionDetail(ref, account);
    return {
      data: data,
      message: 'Service créé avec succès',
      code: HttpStatus.OK,
    };
  }
}
