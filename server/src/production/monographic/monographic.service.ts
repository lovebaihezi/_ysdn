import { Injectable } from '@nestjs/common';
import { Random } from 'mockjs';
import { CreateMonographicDto } from './dto/create-monographic.dto';
import { UpdateMonographicDto } from './dto/update-monographic.dto';

@Injectable()
export class MonographicService {
    create(createMonographicDto: CreateMonographicDto) {
        return 'This action adds a new monographic';
    }

    findAll() {
        const i = 1;
        const f = {
            id: Random.integer(100, 10000).toString(16),
            title: Random.title(i + 1),
            content: Random.paragraph(i + 1),
            authors: [
                {
                    avatarUrl: Random.image(),
                    Account: {
                        auth: Random.name(),
                        nickname: Random.string(),
                        telephone: Random.string(),
                        email: Random.email(),
                        createTime: new Date(),
                    },
                },
            ],
            createTime: new Date(),
            comments: [],
            commentsAmount: 0,
            read: 0,
            tags: [{ name: 'test', clickTimes: 0, createTime: new Date() }],
            markAmount: Random.integer(0, 1000),
            approval: Random.integer(0, 1000),
            disapproval: Random.integer(0, 1000),
            liked: false,
            marked: false,
            modifyTime: [new Date()],
            like: [],
        };
        return new Array(10).fill({}).map((_, i) => ({
            ...f,
            coverUrl: Random.image('550x250'),
            content: Random.string(),
        }));
    }

    findOne(id: number) {
        return `This action returns a #${id} monographic`;
    }

    update(id: number, updateMonographicDto: UpdateMonographicDto) {
        return `This action updates a #${id} monographic`;
    }

    remove(id: number) {
        return `This action removes a #${id} monographic`;
    }
}
