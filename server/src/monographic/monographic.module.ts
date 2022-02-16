import { Module } from '@nestjs/common';
import { MonographicService } from './monographic.service';
import { MonographicController } from './monographic.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../schema/user.schema';
import { Tag, TagSchema } from '../schema/tags.schema';
import {
    Answer,
    AnswerSchema,
    Article,
    ArticleSchema,
    Video,
    VideoSchema,
    Question,
    QuestionSchema,
} from '../schema/production.schema';
import { UserModule } from 'src/user/user.module';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: User.name, schema: UserSchema },
            { name: Tag.name, schema: TagSchema },
            { name: Article.name, schema: ArticleSchema },
            { name: Video.name, schema: VideoSchema },
            { name: Question.name, schema: QuestionSchema },
            { name: Answer.name, schema: AnswerSchema },
        ]),
        UserModule,
    ],
    controllers: [MonographicController],
    providers: [MonographicService],
})
export class MonographicModule {}
