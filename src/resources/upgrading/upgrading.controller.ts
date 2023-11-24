import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, UseGuards, Query } from '@nestjs/common';
import { UpgradingService } from './upgrading.service';
import { UpgradeDto } from './dto/upgrade.dto';
import { JwtAuthGuard } from '../account/auth/auth.guard';
import { Account } from 'src/decorators/account.decorator';
import { ReferencePipe } from 'src/pipes/reference/reference.pipe';
import { ListUpgradingDto } from './dto/list-upgrade.copy';
import { MhouseResponseInterface } from 'src/interfaces/mhouse-response.interface';

@Controller('upgrading')
export class UpgradingController {

  constructor(
    private readonly upgradingService: UpgradingService
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async upgrade(
    @Body(ReferencePipe) upgradeDto: UpgradeDto,
    @Account() account
    ): Promise<MhouseResponseInterface> {
    const data = await this.upgradingService.upgrade(upgradeDto, account);
    return {
      data: data,
      message: "Service créé avec succès",
      code: HttpStatus.OK
    };
    
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async listUpgrading(
    @Query() listUpgradingDto: ListUpgradingDto,
    @Account() account
  ): Promise<MhouseResponseInterface> {
    const data = await this.upgradingService.listUpgrading(listUpgradingDto, account);
    return {
      data: data,
      message: "Service créé avec succès",
      code: HttpStatus.OK
    };
    
  }

  @Get(':ref')
  @UseGuards(JwtAuthGuard)
  async showUpgradingDetail(
    @Param('ref') ref: string,
    @Account() account
    ): Promise<MhouseResponseInterface> {
    const data = await this.upgradingService.showUpgradingDetail(ref, account);
    return {
      data: data,
      message: "Service créé avec succès",
      code: HttpStatus.OK
    };
    
  }

}
