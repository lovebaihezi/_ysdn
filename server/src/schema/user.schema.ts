import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';

export type UserDocument = User & Document;
export type AuthDocument = Auth & Document;
export type LikedRefDocument = LikedRef & Document;

@Schema({})
export class LikedRef {
    @Prop({
        type: [{ type: SchemaTypes.ObjectId, ref: 'Article' }],
    })
    article: string[];

    @Prop({
        type: [{ type: SchemaTypes.ObjectId, ref: 'Video' }],
    })
    video: string[];

    @Prop({
        type: [{ type: SchemaTypes.ObjectId, ref: 'Comment' }],
    })
    comment: string[];

    @Prop({
        type: [{ type: SchemaTypes.ObjectId, ref: 'Tag' }],
    })
    tag: string[];

    @Prop({
        type: [{ type: SchemaTypes.ObjectId, ref: 'Question' }],
    })
    question: string[];

    @Prop({
        type: [{ type: SchemaTypes.ObjectId, ref: 'Answer' }],
    })
    answer: string[];
}

@Schema({})
export class User {
    @Prop({ ref: 'Auth' })
    Auth: string;
    nickname: string;

    @Prop({
        type: [SchemaTypes.ObjectId, 'type in not allowed!'],
        ref: LikedRef.name,
    })
    liked: LikedRef;

    @Prop({ required: false })
    avatarUrl?: string;

    @Prop({ required: false })
    backgroundImage?: string;
}

@Schema({})
export class Auth {
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
    email?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
export const AuthSchema = SchemaFactory.createForClass(Auth);
export const LikeSchema = SchemaFactory.createForClass(LikedRef);
