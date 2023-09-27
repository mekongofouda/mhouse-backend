import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrivilegeModule } from './privilege/privilege.module';
import { RoleModule } from './role/role.module';
import { DiscussionModule } from './discussion/discussion.module';
import { MessageModule } from './message/message.module';
import { PostModule } from './post/post.module';
import { LikeModule } from './like/like.module';
import { ShareModule } from './share/share.module';
import { OfferModule } from './offer/offer.module';
import { ServiceModule } from './service/service.module';
import { NotificationModule } from './notification/notification.module';
import { ResearchModule } from './research/research.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { AccountModule } from './account/account.module';
import { SponsorModule } from './sponsor/sponsor.module';
import { PasswordModule } from './password/password.module';
import { FollowerModule } from './follower/follower.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'Thomymek',
      database: 'mhousedb',
      entities: [join(process.cwd(), 'dist/**/*.entity.js')],
      synchronize: true,
    }),     
    PrivilegeModule, 
    RoleModule, 
    DiscussionModule, 
    MessageModule, 
    PostModule, 
    LikeModule, 
    ShareModule, 
    OfferModule, 
    ServiceModule, 
    NotificationModule, 
    ResearchModule, AuthModule, AccountModule, SponsorModule, PasswordModule, FollowerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}