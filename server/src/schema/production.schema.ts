import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';
import { User } from './user.schema';

export type ReplayDocument = Reply & Document;
export type CommentDocument = Comment & Document;
export type ArticleDocument = Article & Document;

@Schema()
export class Reply {
    @Prop({ type: [{ type: SchemaTypes.ObjectId, ref: Reply.name }] })
    replay: Reply[];
    content: string;
    createTime: Date;
    @Prop({ type: SchemaTypes.ObjectId, ref: User.name })
    author: User;
}

@Schema()
export class Comment {
    content: string;
    @Prop({ type: SchemaTypes.ObjectId, ref: User.name })
    author: User;
    answerTime: Date;
    approval: number;
    @Prop({ type: [{ type: SchemaTypes.ObjectId, ref: Reply.name }] })
    reply: Reply[];
    disapproval: number;
}

@Schema({})
export class Article {
    @Prop()
    tags: string[]; //Tag name
    @Prop()
    title: string;
    @Prop()
    content: string;
    @Prop({
        type: [{ type: SchemaTypes.ObjectId, ref: User.name }],
        default: [],
    })
    authors: User[];
    @Prop()
    coverImgUrl: string;
    @Prop()
    lastModifyTime: Date;
    read: number;
    createTime: Date;
    approval: number;
    @Prop({
        type: [{ type: SchemaTypes.ObjectId, ref: User.name }],
        default: [],
    })
    likes: User[];
    @Prop({
        type: [{ type: SchemaTypes.ObjectId, ref: User.name }],
        default: [],
    })
    marks: User[];
    modifyTime: Date[];
    markAmount: number;
    disapproval: number;
    @Prop({ type: SchemaTypes.ObjectId, ref: Comment.name })
    comments: Comment[];
    commentsAmount: number;
}

@Schema()
export class Answer {
    content: string;
    @Prop({ type: SchemaTypes.ObjectId, ref: User.name })
    author: User;
    answerTime: Date;
    approval: number;
    disapproval: number;
    @Prop({ type: SchemaTypes.ObjectId, ref: User.name })
    comments: Comment[];
}

@Schema()
export class Question {
    read: number;
    title: string;
    tags: string[];
    content: string;
    @Prop({ type: SchemaTypes.ObjectId, ref: User.name })
    author: User;
    createTime: Date;
    approval: number;
    disapproval: number;
    answerAmount: number;
    @Prop({ type: [{ type: SchemaTypes.ObjectId, ref: Answer.name }] })
    answer: Answer[];
}

export const QuestionSchema = SchemaFactory.createForClass(Question);
export const ArticleSchema = SchemaFactory.createForClass(Article);
