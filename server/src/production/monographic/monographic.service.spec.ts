import { Test, TestingModule } from '@nestjs/testing';
import { MonographicService } from './monographic.service';

describe('MonographicService', () => {
  let service: MonographicService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MonographicService],
    }).compile();

    service = module.get<MonographicService>(MonographicService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
