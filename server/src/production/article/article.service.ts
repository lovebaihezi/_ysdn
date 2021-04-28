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
import {
    Model,
    Types,
    Mongoose,
    Schema,
    SchemaType,
    SchemaTypes,
} from 'mongoose';
import { User, UserDocument } from '../../schema/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { assert } from 'console';
import { remove } from 'src/tools';

import { Document } from 'mongoose';
interface IChild extends Types.EmbeddedDocument {
    name: string;
}

interface IParent extends Document {
    name: string;
    children: Types.DocumentArray<IChild>;
}

@Injectable()
export class ArticleService {
    constructor(
        @InjectModel(Article.name)
        private readonly articleModel: Model<ArticleDocument>,
        @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    ) {}
    async createArticle(
        userID: string,
        createArticleDto: CreateArticleDto,
    ): Promise<AjaxJson.responseMessage> {
        const user = await this.userModel.findById(userID).exec();
        assert(user !== undefined, 'TypeError, user is null');
        const createTime = new Date();
        const lastModifyTime = new Date();
        const modifyTime = [new Date()];
        const article = await this.articleModel.create({
            ...createArticleDto,
            createTime,
            lastModifyTime,
            modifyTime,
            author: user.toObject(),
        });
        const result = await article.save();
        user.userProduct.articles.push(result.id);
        await user.save();
        return {
            message: 'update article success',
            type: 'success',
            from: 'server',
        };
    }

    async findAllRank() {
        const articles = await this.articleModel.find({}).limit(10);
        return articles;
    }

    async findAllRecommend() {
        const articles = await this.articleModel.find({}).limit(10);
        return articles;
    }

    findOne(id: string) {
        return this.articleModel.findById(id).exec();
    }

    async updateMark(id: string, userId: string) {
        const article = await this.articleModel.findById(id);
        const user = await this.userModel.findById(userId);
        if (article.marks.includes(user._id)) {
            return {
                message: 'you have already done this!',
                type: 'info',
                from: 'server',
            };
        }
        await article.update({ $inc: { markAmount: 1 } });
        article.marks.push(user._id);
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

    async removeMark(id: string, userId: string) {
        const article = await this.articleModel.findById(id);
        const user = await this.userModel.findById(userId);
        //TODO  : add guard for minus 1
        await article.updateOne({ $inc: { markAmount: -1 } });
        user.marks = user.marks.filter((v) => v.id !== id);
        article.marks.pull(userId);
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
        if (user.like.articles.includes(article._id)) {
            return {
                message: 'you have already done this!',
                type: 'info',
                from: 'server',
            };
        }
        await article.updateOne({ $inc: { approval: 1 } });
        user.like.articles.push(article);
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
        await article.updateOne({ $inc: { approval: -1 } });
        user.like.articles.pull(article._id);
        await article.save();
        await user.save();
        return {
            message: 'operation successfully!',
            type: 'success',
            from: 'server',
        };
    }
}
