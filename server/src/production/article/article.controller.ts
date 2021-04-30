import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Req,
    UseInterceptors,
    UploadedFiles,
    Res,
} from '@nestjs/common';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Express, Request, Response } from 'express';
import { FilesInterceptor } from '@nestjs/platform-express';

class I {
    id: string;
}

@Controller('article')
export class ArticleController {
    constructor(private readonly articleService: ArticleService) {}

    @Post('/create/:userID')
    create(
        @Param('userID') userID: string,
        @Body() createArticleDto: CreateArticleDto,
    ) {
        return this.articleService.createArticle(userID, createArticleDto);
    }

    @Get('rank')
    findAllRank() {
        return this.articleService.findAllRank();
    }

    @Get('recommend')
    findAllRecommend() {
        return this.articleService.findAllRecommend();
    }

    @Get(':pictureName')
    async findImage(
        @Param('pictureName') pictureName: string,
        @Res() res: Response,
    ) {
        return res.sendFile(
            await this.articleService.findOnePicture(pictureName),
        );
    }

    @Post('upload/picture')
    @UseInterceptors(FilesInterceptor('file'))
    async updateImage(@UploadedFiles() files: Express.Multer.File[]) {
        return this.articleService.saveImages(files);
    }

    @Delete('delete/picture')
    async deleteImage(@Body() { id }: { id: string }) {
        return this.articleService.deleteImages(id);
    }

    @Get('article/:id')
    findOneArticle(@Param('id') id: string) {
        return this.articleService.findOne(id);
    }

    @Get(':tag/:type')
    //TODO : finish this!
    findTagType(@Param('tag') tag: string, @Param('type') type: string) {
        return this.articleService.findAllRecommend();
    }

    @Patch('/approval/:articleId')
    updateApproval(@Param('articleId') articleId: string, @Body() { id }: I) {
        return this.articleService.updateApproval(articleId, id);
    }

    @Patch('/mark/:articleId')
    updateMark(@Param('articleId') articleId, @Body() body: I) {
        return this.articleService.updateMark(articleId, body.id);
    }

    @Delete('/approval/:articleId')
    removeApproval(
        @Param('articleId')
        articleId: string,
        @Body()
        { id }: I,
    ) {
        return this.articleService.removeApproval(articleId, id);
    }

    @Delete('/mark/:articleId')
    removeMark(
        @Param('articleId')
        articleId: string,
        @Body()
        { id }: I,
    ) {
        return this.articleService.removeMark(articleId, id);
    }
}
