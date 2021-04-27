import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Article, ArticleSchema } from '../../schema/production.schema';
import { User, UserSchema } from '../../schema/user.schema';
import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';

describe('ArticleController', () => {
    let controller: ArticleController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                MongooseModule.forRoot('mongodb://localhost:27017'),
                MongooseModule.forFeature([
                    { name: User.name, schema: UserSchema },
                    { name: Article.name, schema: ArticleSchema },
                ]),
            ],
            controllers: [ArticleController],
            providers: [ArticleService],
        }).compile();

        controller = module.get<ArticleController>(ArticleController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
