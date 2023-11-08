import { Module } from '@nestjs/common';
import { ServiceService } from './service.service';
import { ServiceController } from './service.controller';
import { Service } from './entities/service.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountEntity } from 'src/resources/account/entities/account.entity';
import { HomeStandingModule } from './home-standing/home-standing.module';
import { RealEstateModule } from './real-estate/real-estate.module';
import { HomeCareModule } from './home-care/home-care.module';
import { HotelBookingModule } from './hotel-booking/hotel-booking.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Service, AccountEntity]),
    HomeStandingModule,
    RealEstateModule,
    HomeCareModule,
    HomeStandingModule,
    HotelBookingModule
  ],
  controllers: [ServiceController],
  providers: [ServiceService],
})
export class ServiceModule {}
