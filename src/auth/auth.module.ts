import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AccountModule } from 'src/account/account.module';
import { JwtModule } from '@nestjs/jwt';
import { AccountService } from 'src/account/account.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountEntity } from 'src/account/entities/account.entity';
import { JwtStrategy } from './strategy/jwt.strategy';
import { ConfigService } from '@nestjs/config';
import { jwtConstants } from './constants';
import { Role } from 'src/role/entities/role.entity';

@Module({
  imports: [
    AccountModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '3600s' },
    }),
    TypeOrmModule.forFeature([AccountEntity, Role])
  ],
  controllers: [AuthController],
  providers: [
    AuthService, 
    AccountService,
    JwtStrategy,
    ConfigService
  ],
})
export class AuthModule {}
