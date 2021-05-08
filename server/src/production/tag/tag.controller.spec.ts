import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Tag, TagSchema } from '../../schema/tags.schema';
import { TagController } from './tag.controller';
import { TagService } from './tag.service';

describe('TagController', () => {
    let controller: TagController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                MongooseModule.forRoot('mongodb://localhost:27017/server', {
                    useNewUrlParser: true,
                    connectTimeoutMS: 30000,
                }),
                MongooseModule.forFeature([
                    { name: Tag.name, schema: TagSchema },
                ]),
            ],
            controllers: [TagController],
            providers: [TagService],
        }).compile();

        controller = module.get<TagController>(TagController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
