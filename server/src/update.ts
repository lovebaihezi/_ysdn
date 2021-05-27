import * as mongoose from 'mongoose';
import { User, UserDocument, UserSchema } from './schema/user.schema';
import {
    Article,
    ArticleDocument,
    ArticleSchema,
    Video,
    VideoDocument,
    VideoSchema,
} from './schema/production.schema';
import createJson from './createInitJson';
import { Tag, TagDocument, TagSchema } from './schema/tags.schema';

//build uml for application!

const userModel = mongoose.model<UserDocument>(User.name, UserSchema);
const articleModel = mongoose.model<ArticleDocument>(
    Article.name,
    ArticleSchema,
);
const videoModel = mongoose.model<VideoDocument>(Video.name, VideoSchema);
const tagModel = mongoose.model<TagDocument>(Tag.name, TagSchema);

(async () => {
    const database = await mongoose.connect(
        'mongodb://localhost:27017/server',
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        },
    );
    const result = await articleModel.updateMany(
        {
            createTime: { $lt: new Date('2021-05-26T00:00:00.000Z') },
        },
        { $set: { createTime: new Date('2020-05-20T13:24:52.000Z') } },
    );
    // await result.save();
    await database.connection.close();
})();
