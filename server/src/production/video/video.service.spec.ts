import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import {
    VideoSchema,
    Video,
    CommentSchema,
    Comment,
} from '../../schema/production.schema';
import { UserSchema, User } from '../../schema/user.schema';
import { VideoController } from './video.controller';
import { VideoModule } from './video.module';
import { VideoService } from './video.service';

describe('VideoService', () => {
    let service: VideoService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                MongooseModule.forRoot('mongodb://localhost:27017/server', {
                    useNewUrlParser: true,
                    // connectTimeoutMS: 30000,
                }),
                MongooseModule.forFeature([
                    { schema: VideoSchema, name: Video.name },
                    { schema: UserSchema, name: User.name },
                    { schema: CommentSchema, name: Comment.name },
                ]),
                VideoModule,
            ],
            controllers: [VideoController],
            providers: [VideoService],
        }).compile();
        service = module.get<VideoService>(VideoService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
