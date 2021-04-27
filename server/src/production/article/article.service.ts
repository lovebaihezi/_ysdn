import { Injectable } from '@nestjs/common';
import { AjaxJson } from '../../interface';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

import { Random } from 'mockjs';

const y = () =>
    new Array(10).fill(0).map(() => ({
        comments: [],
        id: Random.id(),
        createTime: new Date(),
        title: Random.title(1),
        content: Random.paragraph(3),
        like: [],
        read: Random.integer(0, 1000),
        marked: false,
        approval: Random.integer(0, 1000),
        disapproval: 0,
        markAmount: 0,
        modifyTime: [new Date()],
        tags: [{ name: 'test', createTime: new Date(), clickTimes: 0 }],
        liked: false,
        authors: [
            {
                Account: {
                    createTime: new Date(),
                    auth: Random.name(),
                    email: Random.email(),
                    nickname: Random.string(),
                    telephone: Random.string(),
                },
                avatarUrl: Random.image(),
            },
        ],
        lastModifyTime: new Date(),
        coverImgUrl: Random.image('720x300'),
        commentsAmount: 0,
    }));

@Injectable()
export class ArticleService {
    create(createArticleDto: CreateArticleDto) {
        return 'This action adds a new article';
    }

    findAllRank() {
        return y();
    }

    findAllRecommend() {
        return y();
    }

    findOne(id: number) {
        return `This action returns a #${id} article`;
    }

    update(id: number, updateArticleDto: UpdateArticleDto) {
        return `This action updates a #${id} article`;
    }

    remove(id: number) {
        return `This action removes a #${id} article`;
    }
}
