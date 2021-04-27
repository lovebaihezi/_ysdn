import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
} from '@nestjs/common';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

@Controller('article')
export class ArticleController {
    constructor(private readonly articleService: ArticleService) {}

    @Post(':userId')
    create(
        @Param('userId') userId: string,
        @Body() createArticleDto: CreateArticleDto,
    ) {
        return this.articleService.createArticle(userId, createArticleDto);
    }

    @Get('rank')
    findAllRank() {
        return this.articleService.findAllRank();
    }

    @Get('recommend')
    findAllRecommend() {
        return this.articleService.findAllRecommend();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.articleService.findOne(+id);
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateArticleDto: UpdateArticleDto,
    ) {
        // return this.articleService.update(+id, updateArticleDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        // return this.articleService.remove(+id);
    }
}
