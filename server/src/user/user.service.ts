import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../schema/user.schema';
import { Remove, remove } from '../tools';
import { UpdateUserDto } from './user.controller';
import { createHash } from 'crypto';
import { homedir } from 'os';
import * as fs from 'fs/promises';
import {
    Article,
    ArticleDocument,
    Comment,
    CommentDocument,
    Video,
    VideoDocument,
} from '../schema/production.schema';
import { Tag, TagDocument } from '../schema/tags.schema';

//TODO : finish user service
@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        @InjectModel(Article.name)
        private readonly articleModel: Model<ArticleDocument>,
        @InjectModel(Video.name)
        private readonly videoModel: Model<VideoDocument>,
        @InjectModel(Comment.name)
        private readonly commentModel: Model<CommentDocument>,
        @InjectModel(Tag.name)
        private readonly tagModel: Model<TagDocument>,
    ) {}

    private async createAccount(auth: { username: string; password: string }) {
        const user = await this.userModel.create(auth);
        const result = (await user.save()).toObject();
        return remove(result, 'password', '__v');
    }

    private async getUser({
        username,
        id,
    }: { username: string; id?: string } | { id: string; username?: string }) {
        if (username !== undefined) {
            return this.userModel.findOne({ username });
        } else {
            return this.userModel.findById(id);
        }
    }

    public async tokenLogin(token: string) {
        return await this.getUser({ id: token });
    }

    async afterAuthGetUser(username: string) {
        const auth = await this.userModel.findOne({ username }).exec();
        return Remove('__v', 'password', 'id')(auth.toObject());
    }

    public async userLogin(username: string, password: string) {
        const auth = await this.userModel.findOne({ username });
        if (auth !== null) {
            if (auth.password === password) {
                return Remove('__v', 'password')(auth.toObject());
            }
            return {
                message: 'incorrect password!',
                type: 'info',
                from: 'server',
            };
        }
        return {
            message: 'user not found!',
            type: 'info',
            from: 'server',
        };
    }

    public async userRegister(
        {
            username,
            password,
        }: Readonly<{
            username: string;
            password: string;
        }>, // : Promise<AjaxJson.userDetail | AjaxJson.responseMessage>
    ) {
        const user = await this.userModel.find({ username }).exec();
        if (user.length === 0) {
            return await this.createAccount({ username, password });
        }
        return {
            message: 'user already exist!',
            type: 'info',
            from: 'server',
        };
    }

    public async userTagChoose(username: string, tags: string[]) {
        const user = await this.userModel.findOne({ username }).exec();
        while (user.like.tags.length !== 0) user.like.tags.pop();
        for (const i of tags) {
            user.like.tags.push(
                await (await this.tagModel.findOne({ name: i }).exec())._id,
            );
        }
        return remove((await user.save()).toObject(), 'password');
    }

    public async updateAvatar(username: string, file: Express.Multer.File) {
        const home = homedir();
        const fileName = createHash('md5')
            .update(file.originalname)
            .digest('hex');
        const dir = await fs
            .opendir(`${home}/upload/user/${username}`)
            .catch(async () => {
                await fs.mkdir(`${home}/upload/user/${username}`);
            })
            .then(
                async () => await fs.opendir(`${home}/upload/user/${username}`),
            );
        await dir.close();
        const fileHandle = await fs.open(
            `${home}/upload/user/${username}/${fileName}`,
            'w+',
        );
        await fileHandle.write(file.buffer);
        const user = await this.userModel.findOne({ username }).exec();
        user.avatarUrl = file.originalname;
        await user.save();
        return {
            message: 'upload avatar success!',
        };
    }

    public async findUserAvatar(username: string, avatar: string) {
        const home = homedir();
        const fileName = createHash('md5').update(avatar).digest('hex');
        return `${home}/upload/user/${username}/${fileName}`;
    }

    public async completeInformation(id: string, information: UpdateUserDto) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        information = remove(information, 'password', 'username', '_id', 'id');
        const checkResult = await this.userModel
            .find({ email: information.email })
            .count();
        if (checkResult !== 0) {
            return {
                message: 'you should use a different email!',
                type: 'error',
                from: 'server',
            };
        }
        const user = await this.userModel.findById(id);
        user.avatarUrl = information.avatarUrl;
        user.backgroundImage = information.backgroundImage ?? '';
        user.email = information.email ?? '';
        user.nickname = information.nickname;
        return (await user.save()).toObject();
    }

    async deleteUserByUsername({ username }: { username: string }) {
        await this.userModel.deleteOne({ username });
    }

    async getUserProduct(username: string, name: string) {
        const user = await this.userModel.findOne({ username }).exec();
        const names = [
            'articles',
            'videos',
            'comments',
            'questions',
            'answers',
            'activities',
        ];
        if (!names.includes(name)) {
            return {
                message: 'invalid operation',
                type: 'error',
                from: 'server',
            };
        }
        const model = [this.articleModel, this.videoModel, this.commentModel];
        const result = names.indexOf(name);
        if (result > model.length) {
            return {
                message: 'invalid operation',
                type: 'error',
                from: 'server',
            };
        }
        const product = [];
        const all = user.userProduct[names[result]];
        for (const i of all) {
            product.push((await model[result].findById(i).exec()).toObject());
        }
        return product;
    }

    async getUserInfo(username: string, info: string) {
        const filter = ['follow', 'follower'];
        const user = await this.userModel.findOne({ username }).exec();
        if (filter.includes(info)) {
            return { amount: user[info].length };
        }
    }
}
