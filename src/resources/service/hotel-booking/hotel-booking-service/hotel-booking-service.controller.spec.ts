import { Test, TestingModule } from '@nestjs/testing';
import { HotelBookingServiceController } from './hotel-booking-service.controller';
import { HotelBookingServiceService } from './hotel-booking-service.service';

describe('HotelBookingServiceController', () => {
  let controller: HotelBookingServiceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HotelBookingServiceController],
      providers: [HotelBookingServiceService],
    }).compile();

    controller = module.get<HotelBookingServiceController>(HotelBookingServiceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
