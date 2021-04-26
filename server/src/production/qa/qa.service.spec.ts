import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import {
    Question,
    QuestionSchema,
    Answer,
    AnswerSchema,
    Comment,
    CommentSchema,
    Reply,
    ReplySchema,
} from '../../schema/production.schema';
import { User, UserSchema } from '../../schema/user.schema';
import { QaService } from './qa.service';

describe('QaService', () => {
    let service: QaService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                MongooseModule.forRoot('mongodb://localhost:27017/server'),
                MongooseModule.forFeature([
                    { name: User.name, schema: UserSchema },
                    { name: Question.name, schema: QuestionSchema },
                    { name: Answer.name, schema: AnswerSchema },
                    { name: Comment.name, schema: CommentSchema },
                    { name: Reply.name, schema: ReplySchema },
                ]),
            ],
            providers: [QaService],
        }).compile();

        service = module.get<QaService>(QaService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
