import { Module } from '@nestjs/common';
import { HomeCareRealisationService } from './home-care-realisation.service';
import { HomeCareRealisationController } from './home-care-realisation.controller';
import { HomeCare } from '../entities/home-care.entity';
import { HomeCareRealisation } from './entities/home-care-realisation.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountEntity } from 'src/resources/account/entities/account.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([HomeCareRealisation, HomeCare, AccountEntity]),
    HomeCareRealisationModule
  ],
  controllers: [HomeCareRealisationController],
  providers: [HomeCareRealisationService],
})
export class HomeCareRealisationModule {}
