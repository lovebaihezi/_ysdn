import { UserController } from './user.controller';
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import {
    User,
    UserProduct,
    UserProductSchema,
    UserSchema,
} from '../schema/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import {
    Article,
    ArticleSchema,
    Comment,
    CommentSchema,
    Video,
    VideoSchema,
} from '../schema/production.schema';
@Module({
    imports: [
        MongooseModule.forFeature([
            { name: User.name, schema: UserSchema },
            { name: UserProduct.name, schema: UserProductSchema },
            { name: Video.name, schema: VideoSchema },
            { name: Article.name, schema: ArticleSchema },
            { name: Comment.name, schema: CommentSchema },
        ]),
    ],
    controllers: [UserController],
    providers: [UserService],
})
export class UserModule {}
