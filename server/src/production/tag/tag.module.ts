import { Module } from '@nestjs/common';
import { TagService } from './tag.service';
import { TagController } from './tag.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Tag, TagSchema } from '../../schema/tags.schema';
import { User, UserSchema } from 'src/schema/user.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Tag.name, schema: TagSchema },
            { name: User.name, schema: UserSchema },
        ]),
    ],
    controllers: [TagController],
    providers: [TagService],
})
export class TagModule {}
