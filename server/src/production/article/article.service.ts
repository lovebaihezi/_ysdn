import { Injectable } from '@nestjs/common';
import { AjaxJson } from '../../interface';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import {
    Article,
    ArticleDocument,
    ArticleSchema,
    productionName,
} from '../../schema/production.schema';
import { Random } from 'mockjs';
import { Model, Schema, SchemaType, SchemaTypes } from 'mongoose';
import { User, UserDocument } from '../../schema/user.schema';
import { InjectModel } from '@nestjs/mongoose';

const y = () =>
    new Array(10).fill(0).map(() => ({
        comments: [],
        id: Random.id(),
        createTime: new Date(),
        title: Random.title(1),
        content: Random.paragraph(3),
        like: [],
        read: Random.integer(0, 1000),
        marked: false,
        approval: Random.integer(0, 1000),
        disapproval: 0,
        markAmount: 0,
        modifyTime: [new Date()],
        tags: [{ name: 'test', createTime: new Date(), clickTimes: 0 }],
        liked: false,
        authors: [
            {
                Account: {
                    createTime: new Date(),
                    auth: Random.name(),
                    email: Random.email(),
                    nickname: Random.string(),
                    telephone: Random.string(),
                },
                avatarUrl: Random.image(),
            },
        ],
        lastModifyTime: new Date(),
        coverImgUrl: Random.image('720x300'),
        commentsAmount: 0,
    }));

@Injectable()
export class ArticleService {
    constructor(
        @InjectModel(Article.name)
        private readonly articleModel: Model<ArticleDocument>,
        @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    ) {}
    async createArticle(
        id: string,
        createArticleDto: CreateArticleDto,
    ): Promise<AjaxJson.responseMessage> {
        const createTime = new Date();
        const lastModifyTime = new Date();
        const article = await this.articleModel.create({
            ...createArticleDto,
            createTime,
            lastModifyTime,
        });
        const result = await article.save();
        const user = await this.userModel.findById(id);
        user.userProduct.articles.push(result.id);
        await user.save();
        return {
            message: 'update article success',
            type: 'success',
            from: 'server',
        };
    }

    findAllRank() {
        return y();
    }

    findAllRecommend() {
        return y();
    }

    findOne(id: number) {
        return `This action returns a #${id} article`;
    }

    async updateMark(id: string, userId: string) {
        const article = await this.articleModel.findById(id);
        const user = await this.userModel.findById(userId);
        await article.update({ $inc: { markAmount: 1 } });
        article.marks.push(new SchemaTypes.ObjectId(userId));
        user.marks.push({
            name: productionName.Article,
            id: id,
        });
        await article.save();
        await user.save();
        return {
            message: 'operation successfully!',
            type: 'success',
            from: 'server',
        };
    }

    async updateApproval(id: string, userId: string) {
        const article = await this.articleModel.findById(id);
        const user = await this.userModel.findById(userId);
        await article.update({ $inc: { approval: 1 } });
        user.like.articles.push(article);
        await article.save();
        await user.save();
        return {
            message: 'operation successfully!',
            type: 'success',
            from: 'server',
        };
    }

    async removeMark(id: string, userId: string) {
        const article = await this.articleModel.findById(id);
        const user = await this.userModel.findById(userId);
        await article.update({ $inc: { markAmount: -1 } });
        user.marks = user.marks.filter((v) => v.id !== id);
        await article.save();
        await user.save();
        return {
            message: 'operation successfully!',
            type: 'success',
            from: 'server',
        };
    }
    async removeApproval(id: string, userId: string) {
        const article = await this.articleModel.findById(id);
        const user = await this.userModel.findById(userId);
        await article.update({ $inc: { approval: -1 } });
        console.log((user.like.articles as any).pull as any);
        await article.save();
        await user.save();
        return {
            message: 'operation successfully!',
            type: 'success',
            from: 'server',
        };
    }
}
