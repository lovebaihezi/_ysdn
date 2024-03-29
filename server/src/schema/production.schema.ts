import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId, SchemaTypes, Types } from 'mongoose';
import { User, UserInfo, UserInfoSchema } from './user.schema';

export type ReplayDocument = Reply & Document;
export type CommentDocument = Comment & Document;
export type ArticleDocument = Article & Document;
export type AnswerDocument = Answer & Document;
export type QuestionDocument = Question & Document;
export type VideoDocument = Video & Document;
export type ActivityDocument = Activity & Document;
export type ReplyDocument = Reply & Document;

export enum productionName {
    'Notification' = 'Notification',
    'Reply' = 'Reply',
    'Comment' = 'Comment',
    'Article' = 'Article',
    'Video' = 'Video',
    'Activity' = 'Activity',
    'Answer' = 'Answer',
    'Question' = 'Question',
}

// change to subDocument!!!
@Schema()
export class Production {
    @Prop()
    tags: string[];

    @Prop({ default: 0 })
    read: number;

    @Prop()
    title: string;

    @Prop()
    createTime: Date;

    @Prop({ default: 0 })
    approval: number;

    @Prop()
    modifyTime: Date[];

    @Prop({ default: 0 })
    markAmount: number;

    @Prop({ default: 0 })
    disapproval: number;
    // todo : bug : fix this
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
    likes: Types.Array<ObjectId>;

    @Prop({
        type: [{ type: SchemaTypes.ObjectId, ref: User.name }],
        default: [],
    })
    marks: Types.Array<ObjectId>;
}

export const ProductionSchema = SchemaFactory.createForClass(Production);
@Schema()
export class Reply {
    @Prop({
        type: [{ type: SchemaTypes.ObjectId, ref: Reply.name }],
        default: [],
    })
    replay: Types.Array<Reply>;

    @Prop()
    content: string;

    @Prop()
    createTime: Date;

    @Prop({ type: UserInfoSchema, ref: User.name })
    author: UserInfo;
}

export const ReplySchema = SchemaFactory.createForClass(Reply);

@Schema()
export class Comment {
    // change to raw data
    @Prop({ type: SchemaTypes.ObjectId })
    Ref: ObjectId;

    @Prop()
    content: string;

    @Prop({ type: UserInfoSchema, ref: User.name })
    author: UserInfo;

    @Prop()
    answerTime: Date;

    @Prop({ default: 0 })
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

    @Prop({ default: 0 })
    read: number;

    @Prop()
    title: string;

    @Prop()
    createTime: Date;

    @Prop({ default: 0 })
    approval: number;

    @Prop()
    modifyTime: Date[];

    @Prop({ default: 0 })
    markAmount: number;

    @Prop()
    imageUrls: string[];

    @Prop({ default: 0 })
    disapproval: number;

    @Prop({
        type: [{ type: SchemaTypes.ObjectId, ref: Comment.name }],
        default: [],
    })
    comments: Comment[];

    @Prop({ default: 0 })
    commentsAmount: number;

    @Prop()
    content: string;

    @Prop({
        required: true,
        type: UserInfoSchema,
        ref: UserInfo.name,
    })
    //TODO  : this will show all the information of user...remove them(with remove or nestjs way, ) or use middle tool to fix this
    author: UserInfo;

    @Prop({ default: '' })
    coverImgUrl: string;
}

export const ArticleSchema = SchemaFactory.createForClass(Article);

@Schema()
export class Answer {
    @Prop({ type: SchemaTypes.ObjectId, ref: 'Question' })
    Ref: ObjectId;

    @Prop()
    content: string;

    @Prop({ type: UserInfoSchema, ref: User.name })
    author: UserInfo;

    @Prop()
    answerTime: Date;

    @Prop()
    approval: number;

    @Prop()
    disapproval: number;

    @Prop({ type: SchemaTypes.ObjectId, ref: Comment.name })
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

    @Prop({ type: UserInfoSchema, ref: User.name })
    author: UserInfo;

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
    @Prop({ required: true })
    title: string;
    @Prop({ default: [] })
    videoSrc: string[];

    @Prop({ type: UserInfoSchema, ref: User.name })
    author: UserInfo;

    @Prop({ default: [] })
    tags: string[];

    @Prop({ default: '' })
    briefIntro: string;

    @Prop({ default: '' })
    coverImgUrl: string;
}

export const VideoSchema = SchemaFactory.createForClass(Video);

@Schema()
export class Activity extends Production {
    @Prop({
        type: [{ type: SchemaTypes.ObjectId, ref: User.name }],
        default: [],
    })
    holder: UserInfo[];

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
    partner: Types.Array<ObjectId>;

    @Prop({ default: 0 })
    amount: number;

    @Prop({ default: 0 })
    max: number;
}

export const ActivitySchema = SchemaFactory.createForClass(Activity);
