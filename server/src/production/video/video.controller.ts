import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    UseInterceptors,
    UploadedFiles,
    UploadedFile,
    Res,
} from '@nestjs/common';
import { VideoService } from './video.service';
import { CreateVideoDto } from './dot/create-video.dto';
import { Express, Response } from 'express';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('video')
export class VideoController {
    constructor(private readonly videoService: VideoService) {}

    @Get('rank')
    getAllRank() {
        return this.videoService.hotVideo();
    }

    @Get('recommend')
    getAllRecommend() {
        return this.videoService.hotVideo();
    }

    @Get(':tag/:type')
    findOne(@Param('tag') tag: string, @Param('type') type: string) {
        return this.videoService.hotVideo();
    }

    @Get('cover/:username/:file')
    async getCoverImage(
        @Param('username') username: string,
        @Param('file') file: string,
        @Res() res: Response,
    ) {
        res.sendFile(await this.videoService.getCoverImage(username, file));
    }

    @Get('video/:username/:file')
    async getVideo(
        @Param('username') username: string,
        @Param('file') file: string,
        @Res() res: Response,
    ) {
        res.sendFile(await this.videoService.getVideo(username, file));
    }

    @Post('upload/video/:username')
    @UseInterceptors(FilesInterceptor('file'))
    async updateVideo(
        @Param('username') username: string,
        @UploadedFiles() files: Express.Multer.File[],
    ) {
        for (const file of files)
            await this.videoService.saveVideo(username, file);
    }

    @Post('upload/picture/:username')
    @UseInterceptors(FilesInterceptor('file'))
    updateVideoCover(
        @Param('username') username: string,
        @UploadedFiles() [file]: Express.Multer.File[],
    ) {
        // console.log(file);
        return this.videoService.saveVideoCover(username, file);
    }

    @Post(':userID')
    create(
        @Param('userID') userID: string,
        @Body() createVideoDto: CreateVideoDto,
    ) {
        return this.videoService.updateVideo(userID, createVideoDto);
    }
}
