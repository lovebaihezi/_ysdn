import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AjaxJson } from 'src/interface';
import { UserDto, UserInfoDto } from './user.dto';
import { User, UserDocument } from '../schema/user.schema';
import { remove } from '../tools';

//todo : finish user service
@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
    ) {}
    private async createAccount(auth: { username: string; password: string }) {
        const user = await (await this.userModel.create(auth)).save();
        return remove(user.toObject(), 'password', '__v', '_id');
    }
    public async userLogin(username: string, password: string) {
        const auth = await this.userModel.findOne({ username });
        if (auth !== null) {
            if (auth.password === password) {
                return remove(auth.toObject(), 'password', '__v', '_id');
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
            from: 'client',
        };
    }
    public async userTagChoose(id: string, tags: string[]) {
        return await this.userModel.findByIdAndUpdate(id);
    }
    public async completeInformation(
        id: string,
        information: Partial<UserDto>,
    ) {
        return {};
    }
}
