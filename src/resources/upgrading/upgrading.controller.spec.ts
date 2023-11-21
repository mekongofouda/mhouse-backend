import { Test, TestingModule } from '@nestjs/testing';
import { UpgradingController } from './upgrading.controller';
import { UpgradingService } from './upgrading.service';

describe('UpgradingController', () => {
  let controller: UpgradingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UpgradingController],
      providers: [UpgradingService],
    }).compile();

    controller = module.get<UpgradingController>(UpgradingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
