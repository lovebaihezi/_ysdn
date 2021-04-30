import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDto } from './user.dto';
import { User, UserDocument } from '../schema/user.schema';
import { Remove, remove } from '../tools';
import { UpdateUserDto } from './user.controller';
import { createHash } from 'crypto';
import { homedir } from 'os';
import * as fs from 'fs/promises';

//TODO : finish user service
@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
    ) {}

    private async createAccount(auth: {
        username: string;
        password: string;
        nickname: string;
    }) {
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
            nickname,
        }: Readonly<{
            username: string;
            password: string;
            nickname: string;
        }>, // : Promise<AjaxJson.userDetail | AjaxJson.responseMessage>
    ) {
        const user = await this.userModel.find({ username }).exec();
        if (user.length === 0) {
            return await this.createAccount({ username, password, nickname });
        }
        return {
            message: 'user already exist!',
            type: 'info',
            from: 'server',
        };
    }

    public userTagChoose(id: string, tags: string[]) {
        return this.userModel.findByIdAndUpdate(id, { tags });
    }

    public async updateAvatar(username: string, file: Express.Multer.File) {
        const home = homedir();
        const fileName = createHash('md5')
            .update(file.originalname)
            .digest('hex');
        const dir = await fs
            .opendir(`${home}/upload/${username}`)
            .catch(async () => {
                await fs.mkdir(`${home}/upload/${username}`);
            })
            .then(async () => await fs.opendir(`${home}/upload/${username}`));
        await dir.close();
        const fileHandle = await fs.open(
            `${home}/upload/${username}/${fileName}`,
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
        return `${home}/upload/${username}/${fileName}`;
    }

    public async completeInformation(id: string, information: UpdateUserDto) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        information = remove(information, 'password', 'username', '_id', 'id');
        // return this.userModel.findById(id).updateOne({ information });
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
}
