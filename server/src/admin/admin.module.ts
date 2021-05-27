import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
    Article,
    ArticleSchema,
    Comment,
    CommentSchema,
} from '../schema/production.schema';
import { Tag, TagSchema } from '../schema/tags.schema';
import { User, UserSchema } from '../schema/user.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: User.name, schema: UserSchema },
            { name: Article.name, schema: ArticleSchema },
            { name: Comment.name, schema: CommentSchema },
            { name: Tag.name, schema: TagSchema },
        ]),
    ],
    controllers: [AdminController],
    providers: [AdminService],
})
export class AdminModule {}
