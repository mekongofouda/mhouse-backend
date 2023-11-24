import { Module } from '@nestjs/common';
import { ResearchService } from './research.service';
import { ResearchController } from './research.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountEntity } from '../account/entities/account.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([AccountEntity]),
  ],
  controllers: [ResearchController],
  providers: [ResearchService],
})
export class ResearchModule {}
