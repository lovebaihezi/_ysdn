import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import {
    User,
    UserProduct,
    UserProductSchema,
    UserSchema,
} from '../schema/user.schema';
import { UserService } from './user.service';
import {
    Article,
    ArticleSchema,
    Comment,
    CommentSchema,
    Video,
    VideoSchema,
    Reply,
    ReplySchema,
} from '../schema/production.schema';
import { Tag, TagSchema } from '../schema/tags.schema';
import { ArticleService } from '../production/article/article.service';

describe('UserService', () => {
    let service: UserService;
    let articleService: ArticleService;
    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                MongooseModule.forRoot('mongodb://localhost:27017/server', {
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
                    { name: Reply.name, schema: ReplySchema },
                ]),
            ],
            providers: [UserService, ArticleService],
        }).compile();
        service = module.get<UserService>(UserService);
        articleService = module.get<ArticleService>(ArticleService);
        await service.userRegister({
            username: 'testTest',
            password: 'testTest',
        });
    });
    afterAll(async () => {
        await service.deleteUserByUsername({ username: 'testTest' });
    });
    it('should be defined', async () => {
        expect(service).toBeDefined();
    });
    it('should choose tag success', async () => {
        const res = await service.userTagChoose('testTest', [
            'front-end',
            'client-side',
            'server-side',
        ]);
        expect(res.like).toBeDefined();
        expect(res.like.tags).toBeDefined();
        expect(res.like.tags.length).toBe(3);
        for (const i of res.like.tags) {
            expect(typeof i).toBe('object');
        }
        expect(res.password).toBeUndefined();
    });
    it('should find user product', async () => {
        const res = await service.getUserProduct('testTest', 'video');
        expect(res).toBeDefined();
    });

    it('should update user tags', async () => {
        const res = await service.userTagChoose('testTest', []);
        expect(res._id).toBeDefined();
    });
});
