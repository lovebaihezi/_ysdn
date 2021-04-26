import { Test, TestingModule } from '@nestjs/testing';
import { MonographicController } from './monographic.controller';
import { MonographicService } from './monographic.service';

describe('MonographicController', () => {
  let controller: MonographicController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MonographicController],
      providers: [MonographicService],
    }).compile();

    controller = module.get<MonographicController>(MonographicController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
