import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId, SchemaTypes } from 'mongoose';

export type TagDocument = Tag & Document;

@Schema()
export class Tag {
    @Prop()
    name: string;
    @Prop()
    createTime: Date;
    @Prop({ default: 0 })
    clickTimes: number;
    @Prop({ type: String, default: 'init' })
    type: 'init' | 'user';
    @Prop({ type: String, default: 'system' })
    owner: string;
}

export const TagSchema = SchemaFactory.createForClass(Tag);
