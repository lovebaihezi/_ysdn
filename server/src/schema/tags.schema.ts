import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
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
}

export const TagSchema = SchemaFactory.createForClass(Tag);
// TagSchema.pre('save', function (next) {
//     console.log(this);
//     next();
// });
