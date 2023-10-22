import { Test, TestingModule } from '@nestjs/testing';
import { HomeStandingService } from './home-standing.service';

describe('HomeStandingService', () => {
  let service: HomeStandingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HomeStandingService],
    }).compile();

    service = module.get<HomeStandingService>(HomeStandingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
