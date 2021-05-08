import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
    Article,
    ArticleDocument,
    Video,
    VideoDocument,
} from '../schema/production.schema';
import { CreateMonographicDto } from './dto/create-monographic.dto';
import { UpdateMonographicDto } from './dto/update-monographic.dto';

@Injectable()
export class MonographicService {
    constructor(
        @InjectModel(Article.name)
        private readonly articleModel: Model<ArticleDocument>,
        @InjectModel(Video.name)
        private readonly videoModel: Model<VideoDocument>,
    ) {}
    create(createMonographicDto: CreateMonographicDto) {
        return 'This action adds a new monographic';
    }

    private async findVideo() {
        return await this.videoModel.findOne({}).sort({ approval: -1 });
    }

    private async findArticle() {
        return await this.articleModel.findOne({}).sort({ approval: -1 });
    }

    async findAll() {
        const video = await this.findVideo();
        const article = await this.findArticle();
        return { video, article };
    }

    findOne(id: number) {
        return `This action returns a #${id} monographic`;
    }

    update(id: number, updateMonographicDto: UpdateMonographicDto) {
        return `This action updates a #${id} monographic`;
    }

    remove(id: number) {
        return `This action removes a #${id} monographic`;
    }
}
