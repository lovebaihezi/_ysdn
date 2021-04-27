import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
    Answer,
    AnswerDocument,
    Comment,
    CommentDocument,
    Question,
    QuestionDocument,
    ReplayDocument,
    Reply,
} from '../../schema/production.schema';
import { User, UserDocument } from '../../schema/user.schema';
import { Random } from 'mockjs';
const y = () => {
    const Response = () => ({
        author: {
            avatarUrl: 'https://dummyimage.com/100x100',
            Account: {
                createTime: new Date(),
                auth: Random.name(),
                email: Random.email(),
                nickname: Random.string(),
                telephone: Random.string(),
            },
        },
        approval: 10,
        createTime: new Date(),
        tags: ['test'],
        read: 12,
        title: Random.title(),
        id: Random.id(),
        content: Random.paragraph(1, 20),
    });
    return new Array(8).fill(8).map(Response);
};

@Injectable()
export class QaService {
    constructor() {}
    async updateQuestion(id, question: {}) {}
    async getQuestion(id: string) {}
    async updateAnswer(id: string, answer: Answer) {}
    async commentAnswer(id: string, comment: {}) {}
    async replayComment(id: string, replay: {}) {}
    async replayReplay(id: string, replay: {}) {}
    findAllRank() {
        return y().sort((a, b) => a.approval - b.approval);
    }

    findAllRecommend() {
        return y();
    }
}
