import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { AjaxJson } from 'src/interface';
import { AuthDto, UserDto, UserInfoDto } from './user.dto';
import {
    Auth,
    AuthDocument,
    LikedRef,
    LikedRefDocument,
    User,
    UserDocument,
} from '../schema/user.schema';

//todo : finish user service
@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        @InjectModel(Auth.name) private authModel: Model<AuthDocument>,
        @InjectModel(LikedRef.name)
        private likedRefModel: Model<LikedRefDocument>,
    ) {}
    private async createAccount(auth: AuthDto) {
        const createAuth = new this.authModel(auth);
        const Auth = await createAuth.save();
        console.log(Auth);
        const createLiked = new this.likedRefModel({
            tag: [],
            article: [],
            video: [],
            comment: [],
            question: [],
            answer: [],
        });
        const liked = await createLiked.save();
        const userDto: UserDto = {
            Auth: Auth._id,
            nickname: Auth._id,
            liked: liked._id,
        };
        const createAccount = new this.userModel(userDto);
        const Account = await createAccount.save();
        console.log(Account);
        return Account;
    }
    private async userExists(_id: ObjectId) {
        return await this.authModel.findById(_id).exec();
    }
    public async userLogin(
        username: string,
        password: string,
    ): Promise<AjaxJson.userDetail | AjaxJson.responseMessage> {
        const auth = await this.authModel.find({ username }).exec();
        if (auth.length >= 1) {
            const [user] = auth.filter((v) => v.password === password);
            if (user !== undefined) {
                console.log(user);
                return {
                    username: 'lqxclqxc',
                    nickname: '',
                    tags: [],
                    marks: [],
                    liked: [],
                    videos: [],
                    answers: [],
                    articles: [],
                    questions: [],
                    activities: [],
                    avatarUrl: '',
                    follow: [],
                    follower: [],
                    notifications: [],
                };
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
    public async userRegister({
        username,
        password,
        email,
    }: AuthDto): Promise<AjaxJson.userDetail | AjaxJson.responseMessage> {
        const [user] = await this.authModel.find({ username }).exec();
        if (user === undefined) {
            return await this.createAccount({ username, password, email });
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
}
