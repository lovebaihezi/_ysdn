import { Controller, Get } from '@nestjs/common';
import { MonographicService } from './monographic.service';
import { UserService } from '../user/user.service';

@Controller('monographic')
export class MonographicController {
    constructor(
        private readonly monographicService: MonographicService,
        private readonly user: UserService,
    ) {}

    @Get()
    async monographic() {
        return this.monographicService.findAll();
    }
}
