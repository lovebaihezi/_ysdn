import { Test, TestingModule } from '@nestjs/testing';
import { SearchService } from './search.service';
import {
    User,
    UserProduct,
    UserProductSchema,
    UserSchema,
} from '../schema/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import {
    Article,
    ArticleSchema,
    Comment,
    CommentSchema,
    Video,
    VideoSchema,
} from '../schema/production.schema';
import { Tag, TagSchema } from '../schema/tags.schema';
import { UserService } from '../user/user.service';
describe('SearchService', () => {
    let service: SearchService;
    let userService: UserService;
    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                MongooseModule.forRoot('mongodb://localhost:27017/test', {
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
            providers: [SearchService, UserService],
        }).compile();
        service = module.get<SearchService>(SearchService);
        userService = module.get<UserService>(UserService);
        await userService.userRegister({
            username: 'testTest',
            password: 'testTest',
        });
        await userService.userRegister({
            username: 'lqxclqxc',
            password: 'lqxclqxc',
        });
        await userService.userRegister({
            username: 'sparkAction',
            password: 'sparkAction',
        });
        await userService.userRegister({
            username: 'HadoopStart',
            password: 'HadoopStart',
        });
    });

    afterAll(async () => {
        await userService.deleteUserByUsername({ username: 'testTest' });
        await userService.deleteUserByUsername({ username: 'lqxclqxc' });
        await userService.deleteUserByUsername({ username: 'sparkAction' });
        await userService.deleteUserByUsername({ username: 'HadoopStart' });
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
        expect(userService).toBeDefined();
    });

    it('should find one', async () => {
        const result = await service.findAll('lqxc');
        expect(Object.values(result).flat(1).length).toBe(1);
        expect(result.user[0].username).toBe('lqxclqxc');
        expect(result.user[0].password).toBe(undefined);
    });

    it('should find nothing', async () => {
        const result = await service.findAll('b');
        expect(Object.values(result).flat(1).length).toBe(0);
    });
});
