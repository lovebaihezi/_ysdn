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
import {
    Article,
    ArticleSchema,
    Comment,
    CommentSchema,
    Video,
    VideoSchema,
} from '../schema/production.schema';
import { Tag, TagSchema } from '../schema/tags.schema';
import { Server } from 'node:http';

describe('UserService', () => {
    let service: UserService;
    let id: string;
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
                    { name: Video.name, schema: VideoSchema },
                    { name: Article.name, schema: ArticleSchema },
                    { name: Comment.name, schema: CommentSchema },
                    { name: Tag.name, schema: TagSchema },
                ]),
            ],
            providers: [UserService],
        }).compile();
        service = module.get<UserService>(UserService);
        await service.userRegister({
            username: 'testtest',
            password: 'testtest',
        });
    });
    afterEach(async () => {
        await service.deleteUserByUsername({ username: 'testtest' });
    });
    it('should be defined', async () => {
        expect(service).toBeDefined();
    });
    // it('should register', async () => {
    //     const { username } = await service.userRegister({
    //         username: 'lqxclqxc1',
    //         password: 'lqxclqxclqxc',
    //     });
    //     expect(username).toBeDefined();
    // });
    it('should find user product', async () => {
        const res = await service.getUserProduct('testtest', 'video');
        expect(res).toBeDefined();
    });

    it('should update user tags', async () => {
        const res = await service.userTagChoose('testtest', []);
        expect(res._id).toBeDefined();
    });
});
