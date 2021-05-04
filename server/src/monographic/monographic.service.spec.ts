import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import {
    Article,
    ArticleSchema,
    Video,
    VideoSchema,
    Question,
    QuestionSchema,
    Answer,
    AnswerSchema,
} from '../schema/production.schema';
import { Tag, TagSchema } from '../schema/tags.schema';
import { User, UserSchema } from '../schema/user.schema';
import { MonographicService } from './monographic.service';

describe('MonographicService', () => {
    let service: MonographicService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                MongooseModule.forRoot('mongodb://localhost:27017/test'),
                MongooseModule.forFeature([
                    { name: User.name, schema: UserSchema },
                    { name: Tag.name, schema: TagSchema },
                    { name: Article.name, schema: ArticleSchema },
                    { name: Video.name, schema: VideoSchema },
                    { name: Question.name, schema: QuestionSchema },
                    { name: Answer.name, schema: AnswerSchema },
                ]),
            ],
            providers: [MonographicService],
        }).compile();

        service = module.get<MonographicService>(MonographicService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
