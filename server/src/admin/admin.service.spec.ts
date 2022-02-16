import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { FPGrowth } from 'node-fpgrowth';
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
import { AdminService } from './admin.service';

describe('AdminService', () => {
    let service: AdminService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                MongooseModule.forRoot('mongodb://localhost:27017/server'),
                MongooseModule.forFeature([
                    { name: User.name, schema: UserSchema },
                    { name: Video.name, schema: VideoSchema },
                    { name: Article.name, schema: ArticleSchema },
                    { name: Comment.name, schema: CommentSchema },
                    { name: Tag.name, schema: TagSchema },
                    { name: Reply.name, schema: ReplySchema },
                ]),
            ],
            providers: [AdminService],
        }).compile();

        service = module.get<AdminService>(AdminService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
    it('fp growth result', async () => {
        const result = await service.fpGrowth(0.01);
        console.table(result);
    });
    it('kmeans result', async () => {
        for (const each of await service.kmeans(20)) {
            console.table(each);
        }
    });
});
