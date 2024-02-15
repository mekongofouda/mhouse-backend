import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { Role } from '../entities/role.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountEntity } from 'src/resources/account/entities/account.entity';
import { Privilege } from '../privilege/entities/privilege.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Role, AccountEntity, Privilege])],
  controllers: [RoleController],
  providers: [RoleService],
})
export class RoleModule {}
