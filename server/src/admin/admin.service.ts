import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { getThisWeekAndPreviousWeek } from '../tools/getWeek';
import { Article, ArticleDocument } from '../schema/production.schema';
import { Tag, TagDocument } from '../schema/tags.schema';
import { User, UserDocument } from '../schema/user.schema';
import { FPGrowth } from 'node-fpgrowth';
import { get } from '../tools/remove';
import { KMEANS } from 'density-clustering';
import DecisionTree from 'decision-tree';
@Injectable()
export class AdminService {
    constructor(
        @InjectModel(Tag.name)
        private readonly tagModel: Model<TagDocument>,
        @InjectModel(User.name)
        private readonly userModel: Model<UserDocument>,
        @InjectModel(Article.name)
        private readonly articleModel: Model<ArticleDocument>,
    ) {}

    async wholeTimeArticleCount() {
        return await this.articleModel.find({}).countDocuments();
    }

    async wholeTimeUserCount() {
        return await this.userModel.find({}).countDocuments();
    }

    async thisWeekNewArticleCount() {
        const [thisWeek, lastWeek] = getThisWeekAndPreviousWeek();
        return await this.articleModel
            .find({})
            .where({ createTime: { $gte: lastWeek, $lt: thisWeek } })
            .countDocuments();
    }

    async thisWeekNewUserCount() {
        const [thisWeek, lastWeek] = getThisWeekAndPreviousWeek();
        return await this.userModel
            .find({})
            .where({ createTime: { $gte: lastWeek, $lt: thisWeek } })
            .countDocuments();
    }
    async fpGrowth(sup: number) {
        const users = await this.userModel.find({});
        const like_tags = await Promise.all(
            users.map(
                async (user) =>
                    await Promise.all(
                        user.like.tags
                            .filter((v) => v !== null)
                            .map(async (tag) => {
                                const { name } = await this.tagModel.findById(
                                    tag,
                                );
                                return name;
                            }),
                    ),
            ),
        );
        const fp_growth = new FPGrowth<string>(sup);
        return await fp_growth.exec(like_tags);
    }
    async kmeans(k: number) {
        const cluster = new KMEANS();
        const users = await this.userModel.find({});
        const data_set: string[][] = await Promise.all(
            users.map(async (user) => {
                const { like, nickname } = get(
                    user.toObject(),
                    'like',
                    'nickname',
                );
                const tags = await Promise.all(
                    like.tags
                        .filter((x) => x !== null)
                        .map(async (tag) => {
                            const { name } = await this.tagModel.findById(tag);
                            return name;
                        }),
                );
                return [nickname, ...tags];
            }),
        );
        const tags = (await this.tagModel.find({})).map(
            (tag) => tag.toObject().name,
        );
        const map = new Map<string, number>(
            tags.map((tag, index) => [tag, index]),
        );
        const data = data_set.map(([_, ...tags]) =>
            tags.map((tag) => map.get(tag)),
        );
        return cluster
            .run(data, k)
            .map((numbers) => numbers.map((number) => data_set[number]));
    }
}
