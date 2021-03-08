import * as Mongoose from 'mongoose';
export interface auth {
    username: string;
    password: string;
}
export interface account {
    auth: Mongoose.Schema.Types.ObjectId; //auth _id
    nickname: string;
    telephone?: string;
    email?: string;
    avatarUrl?: string;
    createTime: Date;
}

export interface article {
    title: string;
    content: string;
    authors: Array<Mongoose.Schema.Types.ObjectId>; //user _id array
    uploadTime: Date;
    updateTimes: Array<Date>;
    comments: Array<comment>;
}
export interface comment {
    time: Date;
    author: Array<Mongoose.Schema.Types.ObjectId>; //user _id array
    content: string;
    like: Array<Mongoose.Schema.Types.ObjectId>; //user _id array
}
export interface user {
    Account: account & Mongoose.Document;
    articles: Array<Mongoose.Schema.Types.ObjectId>; //article _id array
    historyViewed: Array<Mongoose.Schema.Types.ObjectId>; //article _id array
    bookMarks: Array<Mongoose.Schema.Types.ObjectId>; //article _id array
    comments: Array<Mongoose.Schema.Types.ObjectId>;
    historyLike: Array<Mongoose.Schema.Types.ObjectId>; //article _id array
    historyUpdates: Array<Mongoose.Schema.Types.ObjectId>; //article _id array
}
