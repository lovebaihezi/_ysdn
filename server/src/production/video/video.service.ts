import { Injectable } from '@nestjs/common';
import { Model, ObjectId, SchemaTypes } from 'mongoose';
import { User, UserDocument } from '../../schema/user.schema';
import {
    Comment,
    CommentDocument,
    Reply,
    Video,
    VideoDocument,
} from '../../schema/production.schema';
import { InjectModel } from '@nestjs/mongoose';
import { CreateVideoDto } from './dot/create-video.dto';
import * as fs from 'fs/promises';
import * as os from 'os';
import { createHash } from 'crypto';

@Injectable()
export class VideoService {
    constructor(
        @InjectModel(Video.name) readonly videoModel: Model<VideoDocument>,
        @InjectModel(Comment.name)
        private readonly commentModel: Model<CommentDocument>,
        @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    ) {}

    async updateVideo(id: string, videoInformation: CreateVideoDto) {
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
        return this.videoModel.find({}, {}).limit(10);
    }

    async allVideo(skip = 0) {
        return this.videoModel.find({}).skip(skip).limit(10);
    }

    async saveVideo(username: string, File: Express.Multer.File) {
        const homedir = os.homedir();
        const dir = await fs
            .opendir(`${homedir}/upload/video/${username}`)
            .catch(() => fs.mkdir(`${homedir}/upload/video/${username}`))
            .then(() => fs.opendir(`${homedir}/upload/video/${username}`));
        await dir.close();
        const fileName = createHash('md5')
            .update(File.originalname)
            .digest('hex');
        const file = await fs.open(
            `${homedir}/upload/video/${username}/${fileName}`,
            'w+',
        );
        await file.write(File.buffer);
        await file.close();
    }

    async getCoverImage(username: string, filename: string) {
        const homedir = os.homedir();
        const fileName = createHash('md5').update(filename).digest('hex');
        return `${homedir}/upload/video/${username}/${fileName}`;
    }

    async getVideo(username: string, file: string) {
        const homedir = os.homedir();
        const fileName = createHash('md5').update(file).digest('hex');
        return `${homedir}/upload/video/${username}/${fileName}`;
    }

    async saveVideoCover(username: string, File: Express.Multer.File) {
        const homedir = os.homedir();
        const dir = await fs
            .opendir(`${homedir}/upload/video/${username}`)
            .catch(() => fs.mkdir(`${homedir}/upload/video/${username}`))
            .then(() => fs.opendir(`${homedir}/upload/video/${username}`));
        await dir.close();
        const fileName = createHash('md5')
            .update(File.originalname)
            .digest('hex');
        const file = await fs.open(
            `${homedir}/upload/video/${username}/${fileName}`,
            'w+',
        );
        await file.write(File.buffer).catch((e) => console.error(e));
        await file.close();
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
        video.comments.push(comment._id);
        return await video.save();
    }

    async getComment(id: string, skip = 0, limit = 20) {
        const Ref = new SchemaTypes.ObjectId(id);
        const comment = await this.commentModel
            .find({ Ref })
            .skip(skip)
            .limit(limit);
        return comment;
    }
}
