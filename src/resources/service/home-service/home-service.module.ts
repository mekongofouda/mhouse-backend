import { Module } from '@nestjs/common';
import { HomeServiceService } from './home-service.service';
import { HomeServiceController } from './home-service.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HomeService } from './entities/home-service.entity';
import { Service } from '../entities/service.entity';
import { AccountEntity } from 'src/resources/account/entities/account.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([HomeService, Service, AccountEntity]),
  ],
  controllers: [HomeServiceController],
  providers: [HomeServiceService],
})
export class HomeServiceModule {}
