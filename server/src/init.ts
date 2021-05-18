import * as fs from 'fs/promises';
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

async function initializeDataBase() {
    const All = await createJson();
    const database = await mongoose.connect(
        'mongodb://localhost:27017/server',
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        },
    );
    for (const i of All.userList) {
        const user = await userModel.create(i);
        await user.save();
    }
    for (const i of All.articles) {
        const article = await articleModel.create(i);
        await article.save();
    }
    await database.connection.close();
    console.log('finished!');
    database.connection.on('error', (...rest) => {
        console.log(...rest);
    });
}
initializeDataBase();
export default initializeDataBase;
