import { Module } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountEntity } from '../entities/account.entity';
import { Role } from '../../role/role/entities/role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AccountEntity, Role])],
  controllers: [AccountController],
  providers: [AccountService],
  exports: [AccountService],
})
export class AccountModule {}
