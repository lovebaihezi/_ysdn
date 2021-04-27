import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
} from '@nestjs/common';
import { QaService } from './qa.service';
import { CreateQaDto } from './dto/create-qa.dto';
import { UpdateQaDto } from './dto/update-qa.dto';

@Controller('QA')
export class QaController {
    constructor(private readonly qaService: QaService) {}
    @Get('rank')
    findAllRank() {
        return this.qaService.findAllRank();
    }

    @Get('recommend')
    findAllRecommend() {
        return this.qaService.findAllRecommend();
    }
}
