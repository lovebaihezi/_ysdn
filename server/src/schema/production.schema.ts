import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId, SchemaTypes } from 'mongoose';
import { User, UserSchema } from './user.schema';

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

// change to subDocument!!!
@Schema()
export class Production {
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
    lastModifyTime: Date;

    @Prop({
        type: [{ type: SchemaTypes.ObjectId, ref: User.name }],
        default: [],
    })
    likes: ObjectId[];

    @Prop({
        type: [{ type: SchemaTypes.ObjectId, ref: User.name }],
        default: [],
    })
    marks: ObjectId[];
}

export const ProductionSchema = SchemaFactory.createForClass(Production);

@Schema()
export class Reply {
    @Prop({ type: [{ type: SchemaTypes.ObjectId, ref: Reply.name }] })
    replay: Reply[];
    content: string;
    createTime: Date;
    @Prop({ type: UserSchema, ref: User.name })
    author: User;
}

export const ReplySchema = SchemaFactory.createForClass(Reply);

@Schema()
export class Comment {
    // change to raw data
    @Prop({ type: SchemaTypes.ObjectId })
    Ref: ObjectId;

    @Prop()
    content: string;

    @Prop({ type: UserSchema, ref: User.name })
    author: User;

    @Prop()
    answerTime: Date;

    @Prop()
    approval: number;

    @Prop({
        type: [{ type: ReplySchema, ref: Reply.name }],
        default: [],
    })
    reply: Reply[];

    @Prop({ default: 0 })
    disapproval: number;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);

@Schema({})
export class Article extends Production {
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

    @Prop()
    modifyTime: Date[];

    @Prop()
    markAmount: number;

    @Prop()
    disapproval: number;

    @Prop({ type: [{ type: CommentSchema, ref: Comment.name }], default: [] })
    comments: Comment[];

    @Prop()
    commentsAmount: number;

    @Prop()
    content: string;

    @Prop({
        type: [{ type: User, ref: User.name }],
        default: [],
    })
    authors: User[];

    @Prop()
    coverImgUrl: string;
}

@Schema()
export class Answer {
    @Prop({ type: SchemaTypes.ObjectId, ref: 'Question' })
    Ref: ObjectId;

    @Prop()
    content: string;

    @Prop({ type: User, ref: User.name })
    author: User;

    @Prop()
    answerTime: Date;

    @Prop()
    approval: number;

    @Prop()
    disapproval: number;

    @Prop({ type: CommentSchema, ref: Comment.name })
    comments: Comment[];
}

export const AnswerSchema = SchemaFactory.createForClass(Answer);

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

    @Prop({ type: UserSchema, ref: User.name })
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

export const QuestionSchema = SchemaFactory.createForClass(Question);

@Schema()
export class Video extends Production {
    @Prop()
    title: string;
    @Prop()
    videoSrc: string;

    @Prop({ type: UserSchema, ref: User.name })
    author: User;

    @Prop()
    tags: string[];

    @Prop()
    briefIntro: string;

    @Prop()
    coverImgUrl: string;
}

export const VideoSchema = SchemaFactory.createForClass(Video);

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
    partner: ObjectId[];

    @Prop({ default: 0 })
    amount: number;

    @Prop({ default: 0 })
    max: number;
}
export const ActivitySchema = SchemaFactory.createForClass(Activity);
