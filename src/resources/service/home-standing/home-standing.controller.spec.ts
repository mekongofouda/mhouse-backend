import { Test, TestingModule } from '@nestjs/testing';
import { HomeStandingController } from './home-standing.controller';
import { HomeStandingService } from './home-standing.service';

describe('HomeStandingController', () => {
  let controller: HomeStandingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HomeStandingController],
      providers: [HomeStandingService],
    }).compile();

    controller = module.get<HomeStandingController>(HomeStandingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
