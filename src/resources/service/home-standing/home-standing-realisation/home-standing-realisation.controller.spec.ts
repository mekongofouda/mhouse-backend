import { Test, TestingModule } from '@nestjs/testing';
import { HomeStandingRealisationController } from './home-standing-realisation.controller';
import { HomeStandingRealisationService } from './home-standing-realisation.service';

describe('HomeStandingRealisationController', () => {
  let controller: HomeStandingRealisationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HomeStandingRealisationController],
      providers: [HomeStandingRealisationService],
    }).compile();

    controller = module.get<HomeStandingRealisationController>(HomeStandingRealisationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
