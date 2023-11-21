import { Test, TestingModule } from '@nestjs/testing';
import { UpgradingService } from './upgrading.service';

describe('UpgradingService', () => {
  let service: UpgradingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UpgradingService],
    }).compile();

    service = module.get<UpgradingService>(UpgradingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
