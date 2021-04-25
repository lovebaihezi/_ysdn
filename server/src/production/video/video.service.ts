import { Injectable } from '@nestjs/common';
import { Model, ObjectId } from 'mongoose';
import { User, UserDocument } from '../../schema/user.schema';
import {
    Comment,
    CommentDocument,
    Reply,
    Video,
    VideoDocument,
} from '../../schema/production.schema';
import { InjectModel } from '@nestjs/mongoose';

type UpdateVideoInformation =
    | 'title'
    | 'videoSrc'
    | 'author'
    | 'tags'
    | 'briefIntro'
    | 'coverImgUrl';

@Injectable()
export class VideoService {
    constructor(
        @InjectModel(Video.name) readonly videoModel: Model<VideoDocument>,
        @InjectModel(Comment.name)
        private readonly commentModel: Model<CommentDocument>,
        @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    ) {}
    async updateVideo(
        id: ObjectId,
        videoInformation: Pick<Video, UpdateVideoInformation>,
    ) {
        const video = await this.videoModel.create(videoInformation);
        const user = await this.userModel.findById(id).exec();
        user.userProduct.videos.push(video);
        await video.save();
        return await user.save();
    }
    async deleteVideo(userId: string, videoId: string) {
        const user = await this.userModel.findById(userId);
    }
    async hotVideo() {
        return await this.videoModel.find({}, {}).limit(10);
    }
    async allVideo(skip = 0) {
        return await this.videoModel.find({}).skip(skip).limit(10);
    }
    async AddComment(
        id: string,
        c: {
            content: string;
            author: User;
            answerTime: Date;
            approval: number;
            reply: Reply[];
            disapproval: number;
        },
    ) {
        const video = await this.videoModel.findById(id).exec();
        const comment = await this.commentModel.create(c);
        video.comments.push(comment);
        return await video.save();
    }
}
