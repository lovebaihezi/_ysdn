import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { remove } from '../tools';
import {
    Article,
    ArticleDocument,
    Video,
    VideoDocument,
} from '../schema/production.schema';
import { User, UserDocument } from '../schema/user.schema';
import { CreateSearchDto } from './dto/create-search.dto';
import { UpdateSearchDto } from './dto/update-search.dto';

@Injectable()
export class SearchService {
    constructor(
        @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
        @InjectModel(Article.name)
        private readonly articleModel: Model<ArticleDocument>,
        @InjectModel(Video.name)
        private readonly videoModel: Model<VideoDocument>,
    ) {}

    async findAll(name: string) {
        const findInUser = async () => [
            await this.userModel
                .find({
                    username: new RegExp(`${name}`),
                })
                .limit(20),
            await this.userModel
                .find({ nickname: new RegExp(`${name}`) })
                .limit(20),
        ];
        const findInArticle = async () => [
            await this.articleModel
                .find({ title: new RegExp(`${name}`) })
                .limit(20),
            await this.articleModel
                .find({ content: new RegExp(`${name}`) })
                .limit(20),
        ];
        // return [, ]
        //     .flat(1)
        //     .filter((v) => v !== null);
        return {
            user: [...(await findInUser())]
                .flat(1)
                .filter((v) => v !== null)
                .map((v) => remove(v.toObject(), 'password')),
            article: [...(await findInArticle())]
                .flat(1)
                .filter((v) => v !== null)
                .map((v) => v.toObject()),
        };
    }
}
