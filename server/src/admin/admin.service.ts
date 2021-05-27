import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { getThisWeekAndPreviousWeek } from '../tools/getWeek';
import { Article, ArticleDocument } from '../schema/production.schema';
import { Tag, TagDocument } from '../schema/tags.schema';
import { User, UserDocument } from '../schema/user.schema';

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
}
