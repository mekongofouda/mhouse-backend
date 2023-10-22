import { Module } from '@nestjs/common';
import { SponsorService } from './sponsor.service';
import { SponsorController } from './sponsor.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sponsor } from './entities/sponsor.entity';
import { PostEntity } from 'src/resources/post/entities/post.entity';
import { AccountEntity } from '../../account/entities/account.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Sponsor, PostEntity, AccountEntity])
  ],
  controllers: [SponsorController],
  providers: [SponsorService],
})
export class SponsorModule {}
