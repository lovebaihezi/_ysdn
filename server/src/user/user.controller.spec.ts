import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserModule } from './user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../schema/user.schema';

describe('AppController', () => {
    let userController: UserController;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            imports: [
                UserModule,
                MongooseModule.forRoot('mongodb://localhost:27017/server'),
                MongooseModule.forFeature([
                    { name: User.name, schema: UserSchema },
                ]),
            ],
            controllers: [UserController],
            providers: [UserService],
        }).compile();

        userController = app.get<UserController>(UserController);
    });

    describe('should return right JSON', () => {
        test('should be defined', () => {
            expect(userController).toBeDefined();
        });
    });
});
