import { Test, TestingModule } from '@nestjs/testing';
import { HomeServiceController } from './home-service.controller';
import { HomeServiceService } from './home-service.service';

describe('HomeServiceController', () => {
  let controller: HomeServiceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HomeServiceController],
      providers: [HomeServiceService],
    }).compile();

    controller = module.get<HomeServiceController>(HomeServiceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
