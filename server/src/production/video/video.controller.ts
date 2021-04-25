import { Controller, Get, Post } from '@nestjs/common';
import { VideoService } from './video.service';

@Controller('video')
export class VideoController {
    constructor(private readonly VideoService: VideoService) {}
}
