import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { AjaxJson } from 'src/interface';
import { User, UserSchema } from '../schema/user.schema';
import { UserService } from './user.service';

describe('UserService', () => {
    let service: UserService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                MongooseModule.forRoot('mongodb://localhost:27017/server', {
                    useNewUrlParser: true,
                    connectTimeoutMS: 30000,
                }),
                MongooseModule.forFeature([
                    { name: User.name, schema: UserSchema },
                ]),
            ],
            providers: [UserService],
        }).compile();
        service = module.get<UserService>(UserService);
    });
    it('should login successfully', async () =>
        expect(
            await service.userLogin('lqxclqxc', 'lqxclqxclqxc'),
        ).toStrictEqual<AjaxJson.userDetail>({
            id: '60839a4cb3003890c1e1560e',
            username: 'lqxclqxc',
            nickname: 'no-name',
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
        }));
});
