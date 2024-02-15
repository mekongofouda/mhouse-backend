import { Module } from '@nestjs/common';
import { OfferService } from './offer.service';
import { OfferController } from './offer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Offer } from './entities/offer.entity';
import { PostEntity } from 'src/resources/post/entities/post.entity';
import { AccountEntity } from '../../account/entities/account.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Offer, PostEntity, AccountEntity])],
  controllers: [OfferController],
  providers: [OfferService],
})
export class OfferModule {}
