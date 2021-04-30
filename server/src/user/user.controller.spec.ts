import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
    User,
    UserSchema,
    UserProduct,
    UserProductSchema,
} from '../schema/user.schema';

describe('AppController', () => {
    let userController: UserController;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
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
            controllers: [UserController],
            providers: [UserService],
        }).compile();

        userController = app.get<UserController>(UserController);
    });

    describe('should inject rightly', () => {
        test('should be defined', () => {
            expect(userController).toBeDefined();
        });
    });
});
