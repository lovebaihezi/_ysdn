import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
    Article,
    ArticleDocument,
    Video,
    VideoDocument,
} from '../schema/production.schema';
import { Tag, TagDocument } from '../schema/tags.schema';

@Injectable()
export class MonographicService {
    constructor(
        @InjectModel(Article.name)
        private readonly articleModel: Model<ArticleDocument>,
        @InjectModel(Video.name)
        private readonly videoModel: Model<VideoDocument>,
    ) {}

    private async findVideo() {
        return await this.videoModel.find({}).limit(3).sort({ approval: -1 });
    }

    private async findArticle() {
        return await this.articleModel.find({}).limit(3).sort({ approval: -1 });
    }

    async findAll() {
        const article = await this.findArticle();
        const video = await this.findVideo();
        return { article, video };
    }
}
