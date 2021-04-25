import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { AjaxJson } from 'src/interface';
import {
    User,
    UserProduct,
    UserProductSchema,
    UserSchema,
} from '../schema/user.schema';
import { UserModule } from './user.module';
import { UserService } from './user.service';

describe('UserService', () => {
    let service: UserService;
    let id: string;
    let user: AjaxJson.userDetail;
    const userDetail: AjaxJson.userDetail = {
        id: '6085a037720e490a271f9a7d',
        username: 'lqxclqxc',
        nickname: 'anonymous',
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
        backgroundImage: '',
        userProduct: {
            id: '6085a037720e490a271f9a7c',
            videos: [],
            tags: [],
            answers: [],
            articles: [],
            questions: [],
            activities: [],
            comments: [],
        },
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                MongooseModule.forRoot('mongodb://localhost:27017/server', {
                    useNewUrlParser: true,
                    connectTimeoutMS: 30000,
                }),
                MongooseModule.forFeature([
                    { name: User.name, schema: UserSchema },
                    { name: UserProduct.name, schema: UserProductSchema },
                ]),
            ],
            providers: [UserService],
        }).compile();
        service = module.get<UserService>(UserService);
    });
    // afterAll(async () => {
    //     await service.deleteUserByUsername({ username: 'lqxclqxc' });
    // });
    it('should login successfully', async () => {
        expect(
            await service.userLogin('lqxclqxc', 'lqxclqxclqxc'),
        ).toStrictEqual<AjaxJson.userDetail>(userDetail);
    });
});
