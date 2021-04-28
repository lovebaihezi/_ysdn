import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { VideoService } from './video.service';
import { CreateVideoDto } from './dot/create-video.dto';

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

    @Post(':userID')
    create(
        @Param('userID') userID: string,
        @Body() createVideoDto: CreateVideoDto,
    ) {
        return this.videoService.updateVideo(userID, createVideoDto);
    }
}
