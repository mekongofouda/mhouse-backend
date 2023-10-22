import { Test, TestingModule } from '@nestjs/testing';
import { HomeCareRealisationService } from './home-care-realisation.service';

describe('HomeCareRealisationService', () => {
  let service: HomeCareRealisationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HomeCareRealisationService],
    }).compile();

    service = module.get<HomeCareRealisationService>(HomeCareRealisationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
