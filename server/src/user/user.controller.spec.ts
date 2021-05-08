import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
    User,
    UserSchema,
    UserProduct,
    UserProductSchema,
} from '../schema/user.schema';
import {
    Video,
    VideoSchema,
    Article,
    ArticleSchema,
    Comment,
    CommentSchema,
} from '../schema/production.schema';
import { Tag, TagSchema } from '../schema/tags.schema';

describe('AppController', () => {
    let userController: UserController;

    beforeAll(async () => {
        const app: TestingModule = await Test.createTestingModule({
            imports: [
                MongooseModule.forRoot('mongodb://localhost:27017/test', {
                    useNewUrlParser: true,
                    connectTimeoutMS: 30000,
                }),
                MongooseModule.forFeature([
                    { name: User.name, schema: UserSchema },
                    { name: UserProduct.name, schema: UserProductSchema },
                    { name: Video.name, schema: VideoSchema },
                    { name: Article.name, schema: ArticleSchema },
                    { name: Comment.name, schema: CommentSchema },
                    { name: Tag.name, schema: TagSchema },
                ]),
            ],
            controllers: [UserController],
            providers: [UserService],
        }).compile();

        userController = app.get<UserController>(UserController);
    });

    describe('should inject rightly', () => {
        test('should be defined', () => {
            expect(userController).toBeDefined();
        });
    });
});
