import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Service } from '../service/entities/service.entity';
import { AccountEntity } from 'src/resources/account/entities/account.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Service, AccountEntity])],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
