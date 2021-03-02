import * as Mongoose from 'mongoose';
import * as fs from 'fs/promises';
import { Document, Model, NativeError } from 'mongoose';
import logger from '../../middleware/logger';
import { account, article, auth, comment, user } from '../../@types/interface';

const { Schema, model } = Mongoose;

Mongoose.connect('mongodb://localhost:27017/Yst', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const dataBase = Mongoose.connection;

dataBase.on('error', console.log);
dataBase.once('open', () => {
    console.log('mongodb connect!');
});

// ! Auth  S M Start

const authSchema = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
});

const Auth = model<auth & Document>('auth', authSchema);

// ! Auth End

// ! Account  S M Start

const accountSchema = new Schema({
    auth: { type: Mongoose.Schema.Types.ObjectId, required: true, ref: Auth },
    nickname: String,
    telephone: { type: String, required: false },
    email: { type: String, required: false },
    avatarUrl: { type: String, required: false },
    createTime: { type: Date, required: true },
});

const Account = model<account & Document>('account', accountSchema);

// ! Account End

// ! Article  S M Start

const articleSchema = new Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    authors: { type: [Schema.Types.ObjectId], required: true, ref: Account },
    uploadTime: { type: Date, required: true },
    updateTimes: { type: [Date], required: true },
});

const Article = model<article & Document>('article', articleSchema);

// ! Article End

// ! Comment  S M Start

const commentSchema = new Schema({
    time: { type: Date, required: true },
    author: { type: Schema.Types.ObjectId, required: true },
    content: { type: String, required: true },
    like: { type: [Schema.Types.ObjectId], require: true },
});

const Comment = model<comment & Document>('comment', commentSchema);

// ! Comment End

// ! User  S M Start

const userSchema = new Schema({
    Account: { type: accountSchema, required: true },
    articles: { type: [Schema.Types.ObjectId], required: true, ref: Article },
    historyViewed: {
        // * article
        type: [Schema.Types.ObjectId],
        required: true,
    },
    bookMarks: {
        // * article
        type: [Schema.Types.ObjectId],
        required: true,
    },
    comments: {
        // * comment
        type: [Schema.Types.ObjectId],
        required: true,
        ref: Comment,
    },
    historyLike: {
        // * article
        type: [Schema.Types.ObjectId],
        required: true,
    },
    historyUpdates: {
        // * article
        type: [Schema.Types.ObjectId],
        required: true,
    },
});

const User = model<user & Document>('user', userSchema);

// ! User End

//TODO : update Article ,delete article ,get user articles by ID,

const mongoService = new (class {
    async *findAuth(auth: auth) {
        yield await Auth.findOne({ username: auth.username }).exec();
        yield await Auth.findOne(auth).exec();
    }
    async getAuthId(auth: auth): Promise<Mongoose.Schema.Types.ObjectId> {
        const result = await Auth.findOne(auth).exec();
        return result
            ? result._id
            : (() => {
                  throw new Error('auth access denied!');
              })();
    }
    async getUser(AuthId: Mongoose.Schema.Types.ObjectId) {
        return await User.findOne({ 'Account.auth': AuthId }).exec();
    }
    async insertUser(account: Omit<account, 'auth'> & { auth: auth }) {
        const [{ _id }] = await Auth.insertMany([{ ...account.auth }]);
        const [X] = await Account.insertMany([
            {
                ...account,
                auth: _id,
                createTime: new Date(),
            },
        ]);
        const [result] = await User.insertMany([
            {
                Account: X,
                historyLike: [],
                historyViewed: [],
                historyUpdates: [],
                articles: [],
                bookMarks: [],
                comments: [],
            },
        ]);
        return result;
    }
    async insertArticle(
        userID: Mongoose.Schema.Types.ObjectId,
        article: article
    ) {
        const [X] = await Article.insertMany([{ ...article }]);
        return await User.findOneAndUpdate(
            { _id: userID },
            { $push: { articles: X._id, historyUpdates: X._id } },
            { useFindAndModify: false, new: true }
        );
    }
    async updateArticle(
        userID: Mongoose.Schema.Types.ObjectId,
        article: article
    ) {}
    async getAllArticle(
        userID: Mongoose.Schema.Types.ObjectId
    ): Promise<article[]> {
        const { articles } = (await User.findById(userID).exec()) ?? {
            articles: null,
        };
        const result: Array<article | null> = [];
        if (articles) {
            for (const i of articles) {
                result.push(await Article.findById(i).exec());
            }
        }
        return result.filter(v => v) as article[];
    }
    async getArticle(
        articleID: Mongoose.Schema.Types.ObjectId
    ): Promise<article | null> {
        return await Article.findById(articleID).exec();
    }
})();
// (async () => {
//     try {
//         const user = await mongoService.getUser(
//             await mongoService.getAuthId({
//                 username: 'chai-bowen',
//                 password: 'LqxcLqxcLqxc',
//             })
//         );
//         const time = new Date();
//         const article: article = {
//             title: 'test 2',
//             content: 'nothing important',
//             authors: user?.Account?._id,
//             uploadTime: time,
//             updateTimes: [time],
//         };
//         if (user) await mongoService.insertArticle(user._id, article);
//         console.log(await Article.find({}));
//     } catch (e) {
//         console.error(e);
//     }
// })();

export default mongoService;
