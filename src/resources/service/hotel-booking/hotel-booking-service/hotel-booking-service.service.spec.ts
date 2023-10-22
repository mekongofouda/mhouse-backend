import { Test, TestingModule } from '@nestjs/testing';
import { HotelBookingServiceService } from './hotel-booking-service.service';

describe('HotelBookingServiceService', () => {
  let service: HotelBookingServiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HotelBookingServiceService],
    }).compile();

    service = module.get<HotelBookingServiceService>(HotelBookingServiceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
