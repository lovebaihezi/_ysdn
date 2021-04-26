import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId, SchemaTypes } from 'mongoose';

export type tag = Tag & Document;

@Schema()
export class Tag {
    @Prop()
    name: string;
    @Prop()
    createTime: Date;
    @Prop()
    clickTimes: number;
    @Prop(raw({}))
    production: Record<string, string>;
}

export const TagSchema = SchemaFactory.createForClass(Tag);
