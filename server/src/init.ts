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

//build uml for application!

const userModel = mongoose.model<UserDocument>(User.name, UserSchema);
const articleModel = mongoose.model<ArticleDocument>(
    Article.name,
    ArticleSchema,
);
const videoModel = mongoose.model<VideoDocument>(Video.name, VideoSchema);

async function initializeDataBase() {
    const testUser = (await fs.readFile('./init-json/user.json')).toJSON();
    const testArticle = (
        await fs.readFile('./init-json/article.json')
    ).toJSON();
    const testVideo = (await fs.readFile('./init-json/video.json')).toJSON();
    const database = await mongoose.connect(
        'mongodb://localhost:27017/server',
        {
            useNewUrlParser: true,
        },
    );
    database.connection.on('error', (...rest) => {
        console.log(...rest);
    });
}

export default initializeDataBase;
