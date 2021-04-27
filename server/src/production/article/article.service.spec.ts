import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Article, ArticleSchema } from '../../schema/production.schema';
import { User, UserSchema } from '../../schema/user.schema';
import { ArticleService } from './article.service';

describe('ArticleService', () => {
    let service: ArticleService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                MongooseModule.forRoot('mongodb://localhost:27017'),
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
});
