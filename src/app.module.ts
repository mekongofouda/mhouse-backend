import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrivilegeModule } from './resources/role/privilege/privilege.module';
import { RoleModule } from './resources/role/role/role.module';
import { DiscussionModule } from './resources/discussion/discussion.module';
import { MessageModule } from './resources/discussion/message/message.module';
import { PostModule } from './resources/post/post.module';
import { LikeModule } from './resources/post/like/like.module';
import { ShareModule } from './resources/post/share/share.module';
import { OfferModule } from './resources/post/offer/offer.module';
import { ServiceModule } from './resources/service/service.module';
import { NotificationModule } from './resources/notification/notification.module';
import { ResearchModule } from './resources/research/research.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AuthModule } from './resources/account/auth/auth.module';
import { AccountModule } from './resources/account/account/account.module';
import { SponsorModule } from './resources/post/sponsor/sponsor.module';
import { PasswordModule } from './resources/account/password/password.module';
import { FollowerModule } from './resources/account/follower/follower.module';
import { RealEstateModule } from './resources/service/real-estate/real-estate.module';
import { ProductModule } from './resources/product/product.module';
import { HomeServiceModule } from './resources/service/home-service/home-service.module';
import { SubscriptionModule } from './resources/subscription/subscription.module';
import { ConfigModule } from '@nestjs/config';
import * as dotenv from 'dotenv';

dotenv.config();
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.HOST,
      port: +process.env.PORT,
      username: process.env.USER_DATABASE,
      password: process.env.PASSWORD,
      database: process.env.DATABASE,
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
    ResearchModule,
    AuthModule,
    AccountModule,
    SponsorModule,
    PasswordModule,
    FollowerModule,
    RealEstateModule,
    HomeServiceModule,
    ProductModule,
    SubscriptionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
