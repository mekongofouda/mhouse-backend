import { Module } from '@nestjs/common';
import { ShareService } from './share.service';
import { ShareController } from './share.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Share } from './entities/share.entity';
import { PostEntity } from 'src/post/entities/post.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Share, PostEntity])
  ],
  controllers: [ShareController],
  providers: [ShareService],
})
export class ShareModule {}
