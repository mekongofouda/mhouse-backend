import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AccountModule } from 'src/resources/account/account/account.module';
import { JwtModule } from '@nestjs/jwt';
import { AccountService } from 'src/resources/account/account/account.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountEntity } from 'src/resources/account/entities/account.entity';
import { JwtStrategy } from './strategies/jwt.strategy';
import { ConfigService } from '@nestjs/config';
import { Role } from 'src/resources/role/role/entities/role.entity';
import { FacebookStrategy } from './strategies/facebook.strategy';
import * as dotenv from 'dotenv';

dotenv.config();
@Module({
  imports: [
    AccountModule,
    JwtModule.register({
      secret: process.env.SECRET,
      signOptions: { expiresIn: '3600s' },
    }),
    TypeOrmModule.forFeature([AccountEntity, Role]),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    AccountService,
    JwtStrategy,
    ConfigService,
    FacebookStrategy,
  ],
})
export class AuthModule {}
