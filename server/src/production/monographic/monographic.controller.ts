import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
} from '@nestjs/common';
import { MonographicService } from './monographic.service';
import { CreateMonographicDto } from './dto/create-monographic.dto';
import { UpdateMonographicDto } from './dto/update-monographic.dto';

@Controller('monographic')
export class MonographicController {
    constructor(private readonly monographicService: MonographicService) {}

    @Post()
    create(@Body() createMonographicDto: CreateMonographicDto) {
        return this.monographicService.create(createMonographicDto);
    }

    @Get()
    findAll() {
        return this.monographicService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.monographicService.findOne(+id);
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateMonographicDto: UpdateMonographicDto,
    ) {
        return this.monographicService.update(+id, updateMonographicDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.monographicService.remove(+id);
    }
}
