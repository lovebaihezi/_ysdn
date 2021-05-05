import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Article, ArticleSchema } from '../../schema/production.schema';
import {
    User,
    UserSchema,
    UserProduct,
    UserProductSchema,
} from '../../schema/user.schema';
import {
    Comment,
    CommentSchema,
    Video,
    VideoSchema,
} from '../../schema/production.schema';
import { Tag, TagSchema } from '../../schema/tags.schema';
import { ArticleService } from './article.service';
import { UserService } from '../../user/user.service';

describe('ArticleService', () => {
    let service: ArticleService;
    let userService: UserService;
    let id: string;
    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                MongooseModule.forRoot('mongodb://localhost:27017/test'),
                MongooseModule.forFeature([
                    { name: User.name, schema: UserSchema },
                    { name: UserProduct.name, schema: UserProductSchema },
                    { name: Video.name, schema: VideoSchema },
                    { name: Article.name, schema: ArticleSchema },
                    { name: Comment.name, schema: CommentSchema },
                    { name: Tag.name, schema: TagSchema },
                ]),
            ],
            providers: [ArticleService, UserService],
        }).compile();

        service = module.get<ArticleService>(ArticleService);
        userService = module.get<UserService>(UserService);
        const result = (await userService.userRegister({
            username: 'lqxclqxc',
            password: 'lqxclqxc',
        })) as any;
        id = result.id;
    });

    afterAll(async () => {
        await userService.deleteUserByUsername({ username: 'lqxclqxc' });
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
    it('should get all comment', async () => {

    });
    // it('should create article', async () => {
    //     const res = await service.createArticle('6088d56730a96806c057bc14', {
    //         title: 'test',
    //         tags: ['test'],
    //         content: 'test ,just for test',
    //         coverImgUrl: '',
    //     });
    //     expect(res.message).toBeDefined();
    // });
    // describe('article operation: mark, approval', () => {
    //     it('should mark the article', async () => {
    //         const res = await service.updateMark(articleId, userId);
    //         expect(res.message).toBeDefined();
    //         expect(res.message).toBe('operation successfully!');
    //     });
    //     it('should cancel mark the article', async () => {
    //         const res = await service.removeMark(articleId, userId);
    //         expect(res.message).toBeDefined();
    //         expect(res.message).toBe('operation successfully!');
    //     });
    //     it('should approval the article', async () => {
    //         const res = await service.updateApproval(articleId, userId);
    //         expect(res.message).toBeDefined();
    //         expect(res.message).toBe('operation successfully!');
    //     });
    //     it('should disapproval the article', async () => {
    //         const res = await service.removeApproval(articleId, userId);
    //         expect(res.message).toBeDefined();
    //         expect(res.message).toBe('operation successfully!');
    //     });
    // });
    // describe('upload file',() => {
    //     it('should ')
    // })
});
