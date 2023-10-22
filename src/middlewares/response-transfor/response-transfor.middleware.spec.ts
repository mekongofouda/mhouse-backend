import { ResponseTransforMiddleware } from './response-transfor.middleware';

describe('ResponseTransforMiddleware', () => {
  it('should be defined', () => {
    expect(new ResponseTransforMiddleware()).toBeDefined();
  });
});
