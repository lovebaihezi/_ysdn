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
    afterEach(async () => {
        service.deleteUserByUsername({ username: 'lqxclqxc' });
    });
    it('should be defined', async () => {
        expect(service).toBeDefined();
    });
    it('should register', async () => {
        const { username } = (await service.userRegister({
            username: 'lqxclqxc',
            password: 'lqxclqxclqxc',
        })) as { username: string };
        expect(username).toBeDefined();
    });
});
/*
 {
    "like": {
        "activities": [],
        "answers": [],
        "questions": [],
        "tags": [],
        "comments": [],
        "videos": [],
        "articles": [],
        "_id": "6088344a0713ac71e5fcc789"
    },
    "userProduct": {
        "activities": [],
        "answers": [],
        "questions": [],
        "tags": [],
        "comments": [],
        "videos": [],
        "articles": [],
        "_id": "6088344a0713ac71e5fcc78a",
        "id": "6088344a0713ac71e5fcc78a"
    },
    "notifications": [],
    "follower": [],
    "follow": [],
    "backgroundImage": "",
    "avatarUrl": "https://dummyimage.com/50x50",
    "nickname": "anonymous",
    "username": "lqxclqxc",
    "marks": [],
    "id": "6088344a0713ac71e5fcc78b"
}
*/
