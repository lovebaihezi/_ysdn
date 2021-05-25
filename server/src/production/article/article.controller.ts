import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    Req,
    UseInterceptors,
    UploadedFiles,
    Res,
    Sse,
} from '@nestjs/common';
import { ArticleService, CreateCommentDto } from './article.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { Express, Response } from 'express';
import { FilesInterceptor } from '@nestjs/platform-express';
import { interval, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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

    @Post('update/:id/comment')
    updateArticleComment(
        @Param('id') id: string,
        @Body() comment: CreateCommentDto,
    ) {
        return this.articleService.updateOneComment(id, comment);
    }

    @Post('upload/picture')
    @UseInterceptors(FilesInterceptor('file'))
    async updateImage(@UploadedFiles() files: Express.Multer.File[]) {
        return this.articleService.saveImages(files);
    }

    @Delete(':id')
    deleteArticle(@Param('id') id: string) {
        return this.articleService.deleteArticle(id);
    }

    @Delete('delete/picture')
    async deleteImage(@Body() { id }: { id: string }) {
        return this.articleService.deleteImages(id);
    }

    @Get('article/:id')
    findOneArticle(@Param('id') id: string) {
        return this.articleService.findOne(id);
    }

    @Get(':id/comment')
    findArticleComment(@Param('id') id: string) {
        return this.articleService.findOneComment(id);
    }

    @Get('choose/:tag/:type')
    //TODO : finish this!
    findTagType(@Param('tag') tag: string, @Param('type') type: string) {
        return this.articleService.findByTagAndType(tag, type);
    }

    @Patch('/approval/:articleId')
    updateApproval(@Param('articleId') articleId: string, @Body() { id }: I) {
        return this.articleService.updateApproval(articleId, id);
    }

    @Patch('/read/:articleId')
    updateRead(
        @Param('articleId') id: string,
        @Body() { username }: { username: string },
    ) {
        this.articleService.readArticle(id, username);
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
