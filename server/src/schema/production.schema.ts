import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId, SchemaTypes } from 'mongoose';
import { User } from './user.schema';

export type ReplayDocument = Reply & Document;
export type CommentDocument = Comment & Document;
export type ArticleDocument = Article & Document;
export type AnswerDocument = Answer & Document;
export type QuestionDocument = Question & Document;
export type VideoDocument = Video & Document;
export type ActivityDocument = Activity & Document;
export type ReplyDocument = Reply & Document;

export enum productionName {
    Notification,
    Reply,
    Comment,
    Article,
    Video,
    Activity,
    Answer,
    Question,
}

// mark, disapproval - approval, comment
@Schema()
export class Production {
    get id() {
        return undefined;
    }
    @Prop()
    tags: string[];
    @Prop()
    read: number;
    @Prop()
    title: string;
    @Prop()
    createTime: Date;
    @Prop()
    approval: number;
    @Prop({ type: [{ type: SchemaTypes.ObjectId, ref: User.name }] })
    like: User[];
    @Prop()
    modifyTime: Date[];
    @Prop()
    markAmount: number;
    @Prop()
    disapproval: number;
    @Prop()
    comments: Comment[];
    @Prop()
    commentsAmount: number;
}

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
    @Prop({ type: SchemaTypes.ObjectId })
    Ref: ObjectId;
    @Prop()
    content: string;
    @Prop({ type: SchemaTypes.ObjectId, ref: User.name })
    author: User;
    @Prop()
    answerTime: Date;
    @Prop()
    approval: number;
    @Prop({
        type: [{ type: SchemaTypes.ObjectId, ref: Reply.name }],
        default: [],
    })
    reply: Reply[];
    @Prop({ default: 0 })
    disapproval: number;
}

@Schema({})
export class Article extends Production {
    get id() {
        return undefined;
    }
    @Prop()
    tags: string[];
    @Prop()
    read: number;
    @Prop()
    title: string;
    @Prop()
    createTime: Date;
    @Prop()
    approval: number;
    @Prop({ type: [{ type: SchemaTypes.ObjectId, ref: User.name }] })
    like: User[];
    @Prop()
    modifyTime: Date[];
    @Prop()
    markAmount: number;
    @Prop()
    disapproval: number;
    @Prop()
    comments: Comment[];
    @Prop()
    commentsAmount: number;
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
}

@Schema()
export class Answer {
    @Prop()
    content: string;
    @Prop({ type: SchemaTypes.ObjectId, ref: User.name })
    author: User;
    @Prop()
    answerTime: Date;
    @Prop()
    approval: number;
    @Prop()
    disapproval: number;
    @Prop({ type: SchemaTypes.ObjectId, ref: Comment.name })
    comments: Comment[];
}

@Schema()
export class Question extends Production {
    @Prop()
    read: number;
    @Prop()
    title: string;
    @Prop()
    tags: string[];
    @Prop()
    content: string;
    @Prop({ type: SchemaTypes.ObjectId, ref: User.name })
    author: User;
    @Prop()
    createTime: Date;
    @Prop()
    approval: number;
    @Prop()
    disapproval: number;
    @Prop()
    answerAmount: number;
    @Prop({ type: [{ type: SchemaTypes.ObjectId, ref: Answer.name }] })
    answer: Answer[];
}

@Schema()
export class Video extends Production {
    @Prop()
    title: string;
    @Prop()
    videoSrc: string;
    @Prop({ type: SchemaTypes.ObjectId, ref: User.name })
    author: User;
    @Prop()
    tags: string[];
    @Prop()
    briefIntro: string;
    @Prop()
    coverImgUrl: string;
}

@Schema()
export class Activity extends Production {
    @Prop({
        type: [{ type: SchemaTypes.ObjectId, ref: User.name }],
        default: [],
    })
    holder: User[];
    @Prop()
    form: string;
    @Prop()
    endTime: Date;
    @Prop({ default: [] })
    tags: string[];
    @Prop()
    title: string;
    @Prop()
    startTime: Date;
    @Prop({})
    briefIntro: string;
    @Prop({
        type: [{ type: SchemaTypes.ObjectId, ref: User.name }],
        default: [],
    })
    partner: User[];
    @Prop({ default: 0 })
    amount: number;
    @Prop({ default: 0 })
    max: number;
}

export const QuestionSchema = SchemaFactory.createForClass(Question);
export const ArticleSchema = SchemaFactory.createForClass(Article);
export const VideoSchema = SchemaFactory.createForClass(Video);
export const ActivitySchema = SchemaFactory.createForClass(Activity);
export const CommentSchema = SchemaFactory.createForClass(Comment);
export const ReplySchema = SchemaFactory.createForClass(Answer);
export const AnswerSchema = SchemaFactory.createForClass(Answer);
