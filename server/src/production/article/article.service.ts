import { Injectable } from '@nestjs/common';
import { AjaxJson } from '../../interface';
import { CreateArticleDto } from './dto/create-article.dto';
import {
    Article,
    ArticleDocument,
    Comment,
    CommentDocument,
    productionName,
    Reply,
    ReplyDocument,
} from '../../schema/production.schema';
import { Model, SchemaTypes } from 'mongoose';
import { User, UserDocument } from '../../schema/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import * as fs from 'fs/promises';
import { homedir } from 'os';
import { createHash } from 'crypto';
import { get } from '../../tools';

export class CreateCommentDto {
    author: {
        username: string;
        nickname: string;
        avatarUrl: string;
    };
    content: string;
}

@Injectable()
export class ArticleService {
    constructor(
        @InjectModel(Article.name)
        private readonly articleModel: Model<ArticleDocument>,
        @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
        @InjectModel(Comment.name)
        private readonly commentModel: Model<CommentDocument>,
        @InjectModel(Reply.name)
        private readonly replyComment: Model<ReplyDocument>,
    ) {}

    async createArticle(
        userID: string,
        createArticleDto: CreateArticleDto,
    ): Promise<AjaxJson.responseMessage> {
        const user = await this.userModel.findById(userID).exec();
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
        return this.articleModel.find({}).sort({ approval: -1 }).limit(10);
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
        await article.updateOne({ $inc: { markAmount: 1 } });
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

    async updateOneComment(id: string, createCommentDto: CreateCommentDto) {
        const comment = await this.commentModel.create({
            ...createCommentDto,
            answerTime: new Date(),
        });
        const article = await this.articleModel.findById(id).exec();
        const user = await this.userModel
            .findOne({ username: createCommentDto.author.username })
            .exec();
        article.comments.push(comment._id);
        article.updateOne({ $inc: { commentsAmount: 1 } });
        // article.commentsAmount += 1;
        user.userProduct.comments.push(comment._id);
        await user.save();
        await comment.save();
        await article.save();
        return {
            message: 'operation success!',
            type: 'success',
            from: 'server',
        };
    }

    async findOneComment(id: string) {
        const { comments } = await this.articleModel.findById(id).exec();
        const result = [];
        for (const i of comments) {
            const comment = await this.commentModel.findById(i).exec();
            result.push(comment.toObject());
        }
        return result.sort((a, b) => (b.answerTime > a.answerTime ? 1 : -1));
    }

    private async getTagArticle(tag: string) {
        const articles = await this.articleModel.find({});
        if (tag !== 'all') {
            return articles.filter((v) => v.tags.includes(tag));
        }
        return articles;
    }

    async findByTagAndType(tag: string, type: string) {
        const result = await this.getTagArticle(tag);
        if (type === 'Hottest') {
            return result.sort((a, b) => -a.approval + b.approval);
        } else {
            return result.sort((a, b) =>
                a.createTime > b.createTime ? -1 : 1,
            );
        }
    }

    async readArticle(articleId: string, username: string) {
        const user = await this.userModel.findOne({ username }).exec();
        const article = await this.articleModel.findById(articleId).exec();
        await article.updateOne({ $inc: { read: 1 } });
        await article.save();
        user.readHistory.push(article._id);
        await user.save();
    }

    async deleteArticle(articlesId: string) {
        const article = await this.articleModel.findById(articlesId).exec();
        const user = await this.userModel
            .findOne({ username: article.author.username })
            .exec();
        user.userProduct.articles.pull(articlesId);
        await user.save();
        for (const i of article.comments) {
            await this.commentModel.deleteOne({ _id: i });
        }
        await article.delete();
        // await article.save();
        return 'ok';
    }
}
