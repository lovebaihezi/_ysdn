import Mongoose from 'mongoose';

const { Schema, model } = Mongoose;

const accountSchema = new Schema({
    username: String,
    password: String,
});

const updateContentSchema = new Schema({
    line: [Number],
    New: [String],
    Old: [String],
});

const updateRecordSchema = new Schema({
    time: Date,
    authors: [String],
    content: [updateContentSchema],
});

const commentSchema = new Schema({
    user: [String],
});

const ArticleSchema = new Schema({
    title: String,
    authors: [String],
    lastUpdateDate: updateRecordSchema,
    updateHistory: [updateRecordSchema],
    submitDate: updateRecordSchema,
    content: String,
    comments: [commentSchema],
});

const userSchema = new Schema({
    account: { type: accountSchema },
    articles: [ArticleSchema],
    viewHistory: [ArticleSchema],
    historyComments: [commentSchema],
    bookMarks: [ArticleSchema],
    historyUpdate: [ArticleSchema],
});

export default class {}
