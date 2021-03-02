import * as Mongoose from 'mongoose';
export interface auth {
    username: string;
    password: string;
}
export interface account {
    auth: Mongoose.Schema.Types.ObjectId;
    nickname: string;
    telephone?: string;
    email?: string;
    avatarUrl?: string;
    createTime: Date;
}

export interface article {
    title: string;
    content: string;
    authors: Array<Mongoose.Schema.Types.ObjectId>;
}
export interface comment {
    time: Date;
    author: Array<Mongoose.Schema.Types.ObjectId>;
    content: string;
    like: Array<Mongoose.Schema.Types.ObjectId>;
}
export interface user {
    Account: account;
    articles: Array<Mongoose.Schema.Types.ObjectId>;
    historyViewed: Array<Mongoose.Schema.Types.ObjectId>;
    bookMarks: Array<Mongoose.Schema.Types.ObjectId>;
    comments: Array<Mongoose.Schema.Types.ObjectId>;
    historyLike: Array<Mongoose.Schema.Types.ObjectId>;
    historyUpdates: Array<Mongoose.Schema.Types.ObjectId>;
}
