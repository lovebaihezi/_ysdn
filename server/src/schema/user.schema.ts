import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId, SchemaTypes } from 'mongoose';
// import { UserDto } from 'src/user/user.dto';

export type UserDocument = User & Document;
export type NotificationDocument = Notification & Document;

@Schema({})
export class User {
    @Prop({ default: 'anonymous' })
    nickname: string;

    @Prop({ default: '' })
    avatarUrl: string;

    @Prop({ required: false, default: '' })
    backgroundImage?: string;

    @Prop({ type: [{ type: SchemaTypes.ObjectId }], default: [] })
    marks: string[];

    @Prop({ type: [{ type: SchemaTypes.ObjectId, ref: 'User' }], default: [] })
    follow: User[];

    @Prop({
        type: [{ type: SchemaTypes.ObjectId, ref: 'User' }],
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
        min: [8, 'username is less than 8'],
        max: [20, 'username is longer than 20'],
        match: /[a-zA-Z0-9]{8,20}/g,
    })
    username: string; // this will simplify code when find

    @Prop({
        required: true,
        min: [8, 'password is less than 8'],
        max: [20, 'password is longer than 20'],
        match: /[a-zA-Z0-9]{8,20}/g,
    })
    password: string;

    @Prop({ required: false, type: String })
    email: string;

    @Prop({
        type: [{ type: SchemaTypes.ObjectId, ref: 'Article' }],
        default: [],
    })
    articles: string[];

    @Prop({
        type: [{ type: SchemaTypes.ObjectId, ref: 'Video' }],
        default: [],
    })
    videos: string[];

    // @Prop({
    //     type: [{ type: SchemaTypes.ObjectId, ref: 'Comment' }],
    //     default: [],
    // })
    // comments: string[];

    @Prop({
        type: [{ type: SchemaTypes.ObjectId, ref: 'Tag' }],
        default: [],
    })
    tags: string[];

    @Prop({
        type: [{ type: SchemaTypes.ObjectId, ref: 'Question' }],
        default: [],
    })
    questions: string[];

    @Prop({
        type: [{ type: SchemaTypes.ObjectId, ref: 'Answer' }],
        default: [],
    })
    answers: string[];

    @Prop({
        type: [{ type: SchemaTypes.ObjectId, ref: 'Activity' }],
        default: [],
    })
    activities: string[];

    get liked() {
        return undefined;
    }
}

@Schema()
export class Notification {
    @Prop({ type: SchemaTypes.ObjectId, ref: 'User' })
    sender: ObjectId;

    @Prop()
    body: string;

    @Prop()
    sendTime: Date;

    @Prop({ type: SchemaTypes.ObjectId, ref: 'User' })
    to: ObjectId;
}

export const UserSchema = SchemaFactory.createForClass(User);
UserSchema.loadClass(
    class {
        articles: string[];
        videos: string[];
        comments: string[];
        tags: string[];
        questions: string[];
        answers: string[];
        activities: string[];
        get liked() {
            return [
                ...this.videos,
                ...this.articles,
                ...this.activities,
                ...this.answers,
                ...this.questions,
            ];
        }
    },
);
UserSchema.set('toObject', { getters: true, virtual: true });
export const NotificationSchema = SchemaFactory.createForClass(Notification);
