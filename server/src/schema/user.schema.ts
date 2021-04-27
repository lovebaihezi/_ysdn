import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId, SchemaTypes } from 'mongoose';
import {
    Activity,
    Answer,
    Article,
    productionName,
    Question,
    Video,
} from './production.schema';
import { Tag } from './tags.schema';
// import { UserDto } from 'src/user/user.dto';

export type UserDocument = User & Document;
export type NotificationDocument = Notification & Document;
export type UserProductDocument = UserProduct & Document;
@Schema()
export class UserProduct {
    @Prop({
        type: [{ type: SchemaTypes.ObjectId, ref: 'Article' }],
        default: []
    })
    articles: Article[];

    @Prop({
        type: [{ type: SchemaTypes.ObjectId, ref: 'Video' }],
        default: [],
    })
    videos: Video[];

    @Prop({
        type: [{ type: SchemaTypes.ObjectId, ref: 'Comment' }],
        default: [],
    })
    comments: Comment[];

    @Prop({
        type: [{ type: SchemaTypes.ObjectId, ref: 'Tag' }],
        default: [],
    })
    tags: Tag[];
    @Prop({
        type: [{ type: SchemaTypes.ObjectId, ref: 'Question' }],
        default: [],
    })
    questions: Question[];

    @Prop({
        type: [{ type: SchemaTypes.ObjectId, ref: 'Answer' }],
        default: [],
    })
    answers: Answer[];

    @Prop({
        type: [{ type: SchemaTypes.ObjectId, ref: 'Activity' }],
        default: [],
    })
    activities: Activity[];
}

export const UserProductSchema = SchemaFactory.createForClass(UserProduct);

@Schema()
export class Like {
    @Prop({
        type: [{ type: SchemaTypes.ObjectId, ref: 'Article' }],
        default: [],
    })
    articles: Article[];

    @Prop({
        type: [{ type: SchemaTypes.ObjectId, ref: 'Video' }],
        default: [],
    })
    videos: Video[];

    @Prop({
        type: [{ type: SchemaTypes.ObjectId, ref: 'Comment' }],
        default: [],
    })
    comments: Comment[];

    @Prop({
        type: [{ type: SchemaTypes.ObjectId, ref: 'Tag' }],
        default: [],
    })
    tags: Tag[];

    @Prop({
        type: [{ type: SchemaTypes.ObjectId, ref: 'Question' }],
        default: [],
    })
    questions: Question[];

    @Prop({
        type: [{ type: SchemaTypes.ObjectId, ref: 'Answer' }],
        default: [],
    })
    answers: Answer[];

    @Prop({
        type: [{ type: SchemaTypes.ObjectId, ref: 'Activity' }],
        default: [],
    })
    activities: Activity[];
}

export const LikeSchema = SchemaFactory.createForClass(Like);
@Schema({})
export class User {
    @Prop({ default: 'anonymous' })
    nickname: string;

    @Prop({ default: 'https://dummyimage.com/50x50' })
    avatarUrl: string;

    @Prop({ required: false, default: '' })
    backgroundImage: string;

    @Prop({
        type: [raw({ name: { type: String }, id: { type: String } })],
        default: [],
    })
    marks: { name: productionName; id: string }[];

    @Prop({
        type: [{ type: SchemaTypes.ObjectId, ref: User.name }],
        default: [],
    })
    follow: User[];

    @Prop({
        type: [{ type: SchemaTypes.ObjectId, ref: User.name }],
        default: [],
    })
    follower: User[];

    @Prop({
        type: [{ type: SchemaTypes.ObjectId, ref: 'Notification' }],
        default: [],
    })
    notifications: Notification[];

    @Prop({
        required: true,
        min: [4, 'username is less than 4'],
        max: [20, 'username is longer than 20'],
        match: /^[a-zA-Z0-9]{4,20}$/g,
    })
    username: string; // this will simplify code when find

    @Prop({
        required: true,
        min: [8, 'password is less than 8'],
        max: [20, 'password is longer than 20'],
        match: /^[a-zA-Z0-9]{8,20}$/g,
    })
    password: string;

    @Prop({ required: false, type: String })
    email: string;

    @Prop({
        type: UserProductSchema,
        ref: UserProduct.name,
        default: {
            videos: [],
            tags: [],
            answers: [],
            articles: [],
            questions: [],
            activities: [],
            comments: [],
        },
    })
    userProduct: UserProductDocument;

    @Prop({
        type: LikeSchema,
        ref: Like.name,
        default: {
            videos: [],
            tags: [],
            answers: [],
            articles: [],
            questions: [],
            activities: [],
            comments: [],
        },
    })
    like: Like;
}

@Schema()
export class Notification {
    @Prop({ type: SchemaTypes.ObjectId, ref: User.name })
    sender: ObjectId;

    @Prop()
    body: string;

    @Prop()
    sendTime: Date;

    @Prop({ type: SchemaTypes.ObjectId, ref: User.name })
    to: ObjectId;
}

export const UserSchema = SchemaFactory.createForClass(User);
// UserSchema.loadClass(
//     class {
//         like: Like;
//         get liked() {
// ! this flat will call MaxS Stack(just do not use it...)
//             return Object.values(this.like).flat();
//         }
//     },
// );
UserSchema.set('toObject', { getters: true, virtual: true });
export const NotificationSchema = SchemaFactory.createForClass(Notification);
