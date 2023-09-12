import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrivilegeModule } from './privilege/privilege.module';
import { UserModule } from './user/user.module';
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
import { Privilege } from './privilege/entities/privilege.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'Thomymek',
      database: 'mhousedb',
      entities: [Privilege],
      synchronize: true,
    }),    
    PrivilegeModule, 
    UserModule, 
    RoleModule, 
    DiscussionModule, 
    MessageModule, 
    PostModule, 
    LikeModule, 
    ShareModule, 
    OfferModule, 
    ServiceModule, 
    NotificationModule, 
    ResearchModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}