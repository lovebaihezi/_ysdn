import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Tag, TagSchema } from '../../schema/tags.schema';
import { TagService } from './tag.service';

describe('TagService', () => {
    let service: TagService;

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
            providers: [TagService],
        }).compile();

        service = module.get<TagService>(TagService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
