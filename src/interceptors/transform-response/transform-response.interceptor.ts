import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, map, tap } from 'rxjs';

@Injectable()
export class TransformResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {    
    return next.handle()
    .pipe(
      tap(value => {
      value.data.forEach(data => {

        if (data.refAccount) {
          delete data.id
          delete data.password;
          delete data.salt;
          delete data.token;
          delete data.salt;
          delete data.resetCode;
          delete data.followed;
          delete data.posts;
          delete data.services;
          delete data.discussions;
          delete data.deletedAt;
        }

        if (data.refRole) {
          delete data.id
          delete data.slug;
          delete data.accounts;
          delete data.privileges;
          delete data.deletedAt;
        }

        if (data.refPrivilege) {
          delete data.id
          delete data.deletedAt;
        }

        if (data.refServcie) {
          delete data.id
          delete data.deletedAt;
        }

        if (data.refPost) {
          delete data.id
          delete data.likes
          delete data.offers
          delete data.sponsors
          delete data.deletedAt;
        }

        if (data.refLike) {
          delete data.id
          delete data.deletedAt;
        }

        if (data.refOffer) {
          delete data.id
          delete data.deletedAt;
        }

        if (data.refShare) {
          delete data.id
          delete data.deletedAt;
        }

        if (data.refSponsor) {
          delete data.id
          delete data.deletedAt;
        }
        
      });
    }));
  }
}
