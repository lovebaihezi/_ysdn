import { Module } from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchController } from './search.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
    Video,
    VideoSchema,
    Article,
    ArticleSchema,
    Comment,
    CommentSchema,
} from '../schema/production.schema';
import { Tag, TagSchema } from '../schema/tags.schema';
import {
    User,
    UserSchema,
    UserProduct,
    UserProductSchema,
} from '../schema/user.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: User.name, schema: UserSchema },
            { name: UserProduct.name, schema: UserProductSchema },
            { name: Video.name, schema: VideoSchema },
            { name: Article.name, schema: ArticleSchema },
            { name: Comment.name, schema: CommentSchema },
            { name: Tag.name, schema: TagSchema },
        ]),
    ],
    controllers: [SearchController],
    providers: [SearchService],
})
export class SearchModule {}
