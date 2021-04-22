import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { AjaxJson } from 'src/interface';
import {
    Auth,
    AuthSchema,
    LikedRef,
    LikeSchema,
    User,
    UserSchema,
} from '../schema/user.schema';
import { UserService } from './user.service';

describe('UserService', () => {
    let service: UserService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                MongooseModule.forRoot('mongodb://localhost:27017/server'),
                MongooseModule.forFeature([
                    { name: User.name, schema: UserSchema },
                    { name: LikedRef.name, schema: LikeSchema },
                    { name: Auth.name, schema: AuthSchema },
                ]),
            ],
            providers: [UserService],
        }).compile();
        service = module.get<UserService>(UserService);
    });

    it('should be defined', async () => {
        expect(service).toBeDefined();
    });
    it('should login successfully', async () => {
        expect(
            await service.userLogin('lqxclqxc', 'lqxclqxc'),
        ).toStrictEqual<AjaxJson.userDetail>({
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
        });
    });
    // it('should register successfully', async () => {
    //     const res = await service.userRegister({
    //         username: 'lqxclqxc1',
    //         password: 'lqxclqxc2',
    //     });
    //     expect(res).toStrictEqual({ username: 'lqxclqxc1' });
    // });
});
