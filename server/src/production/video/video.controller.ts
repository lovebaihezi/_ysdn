import { Controller, Get } from '@nestjs/common';
import { VideoService } from './video.service';

@Controller('video')
export class VideoController {
    constructor(private readonly videoService: VideoService) {}
    @Get('rank')
    getAllRank() {
        return this.videoService.getAllRank();
    }
    @Get('recommend')
    getAllRecommend() {
        return this.videoService.getAllRecommend();
    }
}
