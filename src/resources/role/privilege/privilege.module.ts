import { Module } from '@nestjs/common';
import { PrivilegeService } from './privilege.service';
import { PrivilegeController } from './privilege.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Privilege } from './entities/privilege.entity';
import { Role } from 'src/resources/role/entities/role.entity';
import { AccountEntity } from '../../account/entities/account.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Privilege, Role, AccountEntity])
  ],
  controllers: [PrivilegeController],
  providers: [PrivilegeService],
})
export class PrivilegeModule {}
