import { Test, TestingModule } from '@nestjs/testing';
import { HomeCareController } from './home-care.controller';
import { HomeCareService } from './home-care.service';

describe('HomeCareController', () => {
  let controller: HomeCareController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HomeCareController],
      providers: [HomeCareService],
    }).compile();

    controller = module.get<HomeCareController>(HomeCareController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
