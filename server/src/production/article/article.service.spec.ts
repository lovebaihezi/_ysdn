import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Article, ArticleSchema } from '../../schema/production.schema';
import { User, UserSchema } from '../../schema/user.schema';
import { ArticleService } from './article.service';

describe('ArticleService', () => {
    let service: ArticleService;
    //TODO :  need add user service to check user data!!!
    const articleId = '6088d59030a96806c057bc1d';
    const userId = '6088d56730a96806c057bc14';
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                MongooseModule.forRoot('mongodb://localhost:27017/server'),
                MongooseModule.forFeature([
                    { name: User.name, schema: UserSchema },
                    { name: Article.name, schema: ArticleSchema },
                ]),
            ],
            providers: [ArticleService],
        }).compile();

        service = module.get<ArticleService>(ArticleService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
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
    describe('article operation: mark, approval', () => {
        it('should mark the article', async () => {
            const res = await service.updateMark(articleId, userId);
            expect(res.message).toBeDefined();
            expect(res.message).toBe('operation successfully!');
        });
        it('should cancel mark the article', async () => {
            const res = await service.removeMark(articleId, userId);
            expect(res.message).toBeDefined();
            expect(res.message).toBe('operation successfully!');
        });
        it('should approval the article', async () => {
            const res = await service.updateApproval(articleId, userId);
            expect(res.message).toBeDefined();
            expect(res.message).toBe('operation successfully!');
        });
        it('should disapproval the article', async () => {
            const res = await service.removeApproval(articleId, userId);
            expect(res.message).toBeDefined();
            expect(res.message).toBe('operation successfully!');
        });
    });
});
