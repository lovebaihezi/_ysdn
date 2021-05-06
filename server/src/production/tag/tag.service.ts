import { Injectable } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { Tag, TagDocument } from '../../schema/tags.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class TagService {
    constructor(
        @InjectModel(Tag.name) private readonly tagModel: Model<TagDocument>,
    ) {
        const x = [
            'front-end',
            'client-side',
            'server-side',
            'QA',
            'media',
            'algorithm',
            'data',
            'common',
            'product',
            'security',
            'project',
        ];
        (async () => {
            if ((await this.tagModel.find({})).length === 0)
                for (const name of x) {
                    const each = await this.tagModel.create({
                        name,
                        createTime: new Date(),
                    });
                    await each.save();
                }
        })();
    }
    create(createTagDto: CreateTagDto) {
        return 'This action adds a new tag';
    }

    async findAll() {
        return (await this.tagModel.find({}).limit(12).exec()).map(
            ({ name }) => name,
        );
    }

    findOne(id: number) {
        return `This action returns a #${id} tag`;
    }

    update(id: number, updateTagDto: UpdateTagDto) {
        return `This action updates a #${id} tag`;
    }

    remove(id: number) {
        return `This action removes a #${id} tag`;
    }
}
