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

    // TODO: more param to get detail info.. split page,
    async findAll(name: string) {
        const findInUser = async () => [
            await this.userModel.find({
                username: new RegExp(`${name}`, 'i'),
            }),
            await this.userModel.find({ nickname: new RegExp(`${name}`, 'i') }),
        ];
        const findInArticle = async () => [
            await this.articleModel.find({ title: new RegExp(`${name}`, 'i') }),
            await this.articleModel.find({
                content: new RegExp(`${name}`, 'i'),
            }),
        ];
        const findInVideo = async () => [
            await this.videoModel.find({ title: new RegExp(`${name}`, 'i') }),
            await this.videoModel.find({
                briefIntro: new RegExp(`${name}`, 'i'),
            }),
        ];
        const user = [
            ...(await findInUser())
                .flat(1)
                .filter((v) => v !== null)
                .map((v) => remove(v.toObject(), 'password')),
        ].reduce(
            (prev, v) =>
                prev.some((x) => x.username === v.username)
                    ? prev
                    : [...prev, v],
            [],
        );
        const article = [
            ...(await findInArticle())
                .flat(1)
                .filter((v) => v !== null)
                .map((v) => v.toObject()),
        ].reduce(
            (prev, v) =>
                prev.some((x) => x.title === v.title) ? prev : [...prev, v],
            [],
        );
        const video = [
            ...(await findInVideo())
                .flat(1)
                .filter((v) => v !== null)
                .map((v) => v.toObject()),
        ].reduce(
            (prev, v) =>
                prev.some((x) => x.title === v.title) ? prev : [...prev, v],
            [],
        );
        return {
            user,
            article,
            video,
        };
    }
}
