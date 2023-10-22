import { Test, TestingModule } from '@nestjs/testing';
import { HomeStandingRealisationService } from './home-standing-realisation.service';

describe('HomeStandingRealisationService', () => {
  let service: HomeStandingRealisationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HomeStandingRealisationService],
    }).compile();

    service = module.get<HomeStandingRealisationService>(HomeStandingRealisationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
