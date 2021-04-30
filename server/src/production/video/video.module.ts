import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
    Comment,
    CommentSchema,
    Video,
    VideoSchema,
} from '../../schema/production.schema';
import { User, UserSchema } from '../../schema/user.schema';
import { VideoController } from './video.controller';
import { VideoService } from './video.service';
import { MulterModule } from '@nestjs/platform-express';

@Module({
    imports: [
        MulterModule.register({ dest: './files' }),
        MongooseModule.forFeature([
            { schema: VideoSchema, name: Video.name },
            { schema: UserSchema, name: User.name },
            { schema: CommentSchema, name: Comment.name },
        ]),
    ],
    controllers: [VideoController],
    providers: [VideoService],
})
export class VideoModule {}
