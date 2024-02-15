import { Module } from '@nestjs/common';
import { ServiceService } from './service.service';
import { ServiceController } from './service.controller';
import { Service } from './entities/service.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountEntity } from 'src/resources/account/entities/account.entity';
import { RealEstateModule } from './real-estate/real-estate.module';
import { HomeServiceModule } from './home-service/home-service.module';
import { ProductModule } from '../product/product.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Service, AccountEntity]),
    RealEstateModule,
    HomeServiceModule,
    ProductModule,
  ],
  controllers: [ServiceController],
  providers: [ServiceService],
})
export class ServiceModule {}
