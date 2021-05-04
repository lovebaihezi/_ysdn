import { Test, TestingModule } from '@nestjs/testing';
import { SearchController } from './search.controller';
import { SearchService } from './search.service';
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
import { Tag, TagSchema } from '../schema/tags.schema';

describe('SearchController', () => {
    let controller: SearchController;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
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
            controllers: [SearchController],
            providers: [SearchService],
        }).compile();

        controller = module.get<SearchController>(SearchController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
