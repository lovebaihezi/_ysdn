import { Schema } from 'mongoose';
import { Article, Comment } from 'src/schema/production.schema';
import { User } from 'src/schema/user.schema';

export class CreateArticleDto {
    tags: string[];
    read: number;
    title: string;
    createTime: Date;
    modifyTime: Date[];
    content: string;
    authors: User[];
    coverImgUrl: string;
    lastModifyTime: Date;
}
