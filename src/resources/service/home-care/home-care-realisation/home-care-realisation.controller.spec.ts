import { Test, TestingModule } from '@nestjs/testing';
import { HomeCareRealisationController } from './home-care-realisation.controller';
import { HomeCareRealisationService } from './home-care-realisation.service';

describe('HomeCareRealisationController', () => {
  let controller: HomeCareRealisationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HomeCareRealisationController],
      providers: [HomeCareRealisationService],
    }).compile();

    controller = module.get<HomeCareRealisationController>(HomeCareRealisationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
