import { Test, TestingModule } from '@nestjs/testing';
import { QaController } from './qa.controller';
import { QaService } from './qa.service';
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
import { MongooseModule } from '@nestjs/mongoose';

describe('QaController', () => {
    let controller: QaController;

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
            controllers: [QaController],
            providers: [QaService],
        }).compile();

        controller = module.get<QaController>(QaController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
