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
        await service.deleteUserByUsername({ username: 'test123' });
    });
    it('should be defined', async () => {
        expect(service).toBeDefined();
    });
    it('should register', async () => {
        const { username } = await service.userRegister({
            username: 'lqxclqxc1',
            password: 'lqxclqxclqxc',
        });
        expect(username).toBeDefined();
    });
});
