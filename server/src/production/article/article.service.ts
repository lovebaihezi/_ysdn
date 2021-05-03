import { Injectable } from '@nestjs/common';
import { AjaxJson } from '../../interface';
import { CreateArticleDto } from './dto/create-article.dto';
import {
    Article,
    ArticleDocument,
    productionName,
} from '../../schema/production.schema';
import { Model } from 'mongoose';
import { User, UserDocument } from '../../schema/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { assert } from 'console';
import * as fs from 'fs/promises';
import { homedir } from 'os';
import { createHash } from 'crypto';
import { get } from '../../tools';

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
            createTime,
            lastModifyTime,
            modifyTime,
            ...createArticleDto,
            author: get(user.toObject(), 'nickname', 'username', 'avatarUrl'),
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

    // async updateArticle(userID: string, updateArticleDto: UpdateActivityDto) {
    //     const user = await this.userModel.findById(userID).exec();
        
    // }

    async findAllRank() {
        return this.articleModel.find({}).limit(10);
    }

    async findAllRecommend() {
        return this.articleModel.find({}).limit(10);
    }

    //TODO : remove user info in side...
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

    async deleteImages(pictureName: string) {
        const home = homedir();
        const fileName = createHash('md5').update(pictureName).digest('hex');
        await fs.rm(`${home}/upload/pictures/${fileName}`);
        return { message: 'delete success!' };
    }

    async findOnePicture(pictureName: string) {
        const home = homedir();
        const fileName = createHash('md5').update(pictureName).digest('hex');
        return `${home}/upload/pictures/${fileName}`;
    }

    async saveImages(images: Express.Multer.File[]) {
        const home = homedir();
        const dir = await fs
            .opendir(`${home}/upload/pictures`)
            .catch(async () => await fs.mkdir(`${home}/upload/pictures`))
            .then(async () => await fs.opendir(`${home}/upload/pictures`));
        await dir.close();
        const path = dir.path;
        for (const i of images) {
            const fileName = createHash('md5')
                .update(i.originalname)
                .digest('hex');
            const file = await fs.open(`${path}/${fileName}`, 'w+');
            await file.write(i.buffer);
            await file.close();
        }
    }
}
