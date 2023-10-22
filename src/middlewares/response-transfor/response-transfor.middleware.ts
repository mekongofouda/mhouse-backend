import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class ResponseTransforMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    console.log(res);
    next();
  }
}
