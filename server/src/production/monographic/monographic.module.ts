import { Module } from '@nestjs/common';
import { MonographicService } from './monographic.service';
import { MonographicController } from './monographic.controller';

@Module({
  controllers: [MonographicController],
  providers: [MonographicService]
})
export class MonographicModule {}
