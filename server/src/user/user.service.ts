import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDto } from './user.dto';
import {
    User,
    UserDocument,
    UserProduct,
    UserProductDocument,
} from '../schema/user.schema';
import { Remove, remove } from '../tools';
import { assert } from 'console';
import { AjaxJson } from '../interface';
import {
    productionName,
    Video,
    VideoDocument,
} from '../schema/production.schema';

//todo : finish user service
@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
    ) {}
    private async createAccount(auth: { username: string; password: string }) {
        const user = await this.userModel.create(auth);
        const result = (await user.save()).toObject();
        return remove(result, 'password', '__v', '_id');
    }
    private async getUser({
        username,
        id,
    }: { username: string; id?: string } | { id: string; username?: string }) {
        if (username !== undefined) {
            return await this.userModel.findOne({ username });
        } else {
            return await this.userModel.findById(id);
        }
    }
    public async tokenLogin(token: string) {
        return await this.getUser({ id: token });
    }
    async afterAuthGetUser(username: string) {
        const auth = await this.userModel.findOne({ username }).exec();
        return Remove('__v', '_id', 'password', 'id')(auth.toObject());
    }
    public async userLogin(username: string, password: string) {
        const auth = await this.userModel.findOne({ username });
        if (auth !== null) {
            if (auth.password === password) {
                return Remove('__v', '_id', 'password')(auth.toObject());
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
    public async userTagChoose(id: string, tags: string[]) {
        return await this.userModel.findByIdAndUpdate(id, { tags });
    }
    public async completeInformation(
        id: string,
        information: Partial<UserDto>,
    ) {
        information = remove(information, 'password', 'username');
        return await this.userModel.findById(id, information);
    }
    async deleteUserByUsername({ username }: { username: string }) {
        await this.userModel.deleteOne({ username });
    }
}
