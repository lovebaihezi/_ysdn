import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Query,
    Delete,
} from '@nestjs/common';
import { TagService } from './tag.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';

@Controller('tag')
export class TagController {
    constructor(private readonly tagService: TagService) {}

    @Post()
    create(@Body() createTagDto: CreateTagDto) {
        return this.tagService.create(createTagDto);
    }

    @Get()
    findAll() {
        return this.tagService.findAll();
    }

    @Get('nonExistThenInsert')
    existOrInsert(@Query('value') value: string, @Query('user') user: string) {
        console.log(value, user);
        return this.tagService.existOrInsert(value, user);
    }

    @Get('userTag/:username')
    findOne(@Param('username') username: string) {
        return this.tagService.findOne(username);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateTagDto: UpdateTagDto) {
        return this.tagService.update(+id, updateTagDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.tagService.remove(+id);
    }
}
