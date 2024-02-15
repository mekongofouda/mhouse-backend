import { Test, TestingModule } from '@nestjs/testing';
import { HomeServiceService } from './home-service.service';

describe('HomeServiceService', () => {
  let service: HomeServiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HomeServiceService],
    }).compile();

    service = module.get<HomeServiceService>(HomeServiceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
