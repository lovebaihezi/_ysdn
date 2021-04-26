import { Module } from '@nestjs/common';
import { QaService } from './qa.service';
import { QaController } from './qa.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../../schema/user.schema';
import {
    Answer,
    AnswerSchema,
    Comment,
    CommentSchema,
    Question,
    QuestionSchema,
    Reply,
    ReplySchema,
} from '../../schema/production.schema';

@Module({
    imports: [
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
})
export class QaModule {}
