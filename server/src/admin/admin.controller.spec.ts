import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import {
    Video,
    VideoSchema,
    Article,
    ArticleSchema,
    Comment,
    CommentSchema,
    Reply,
    ReplySchema,
} from '../schema/production.schema';
import { Tag, TagSchema } from '../schema/tags.schema';
import { User, UserSchema } from '../schema/user.schema';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';

describe('AdminController', () => {
    let controller: AdminController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                MongooseModule.forRoot('mongodb://localhost:27017/test'),
                MongooseModule.forFeature([
                    { name: User.name, schema: UserSchema },
                    { name: Video.name, schema: VideoSchema },
                    { name: Article.name, schema: ArticleSchema },
                    { name: Comment.name, schema: CommentSchema },
                    { name: Tag.name, schema: TagSchema },
                    { name: Reply.name, schema: ReplySchema },
                ]),
            ],
            controllers: [AdminController],
            providers: [AdminService],
        }).compile();

        controller = module.get<AdminController>(AdminController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
