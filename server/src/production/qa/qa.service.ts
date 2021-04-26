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

@Injectable()
export class QaService {
    constructor(
        @InjectModel(Question.name)
        private readonly questionModel: Model<QuestionDocument>,
        @InjectModel(Answer.name)
        private readonly answerModel: Model<AnswerDocument>,
        @InjectModel(User.name)
        private readonly userModel: Model<UserDocument>,
        @InjectModel(Comment.name)
        private readonly commentModel: Model<CommentDocument>,
        @InjectModel(Reply.name)
        private readonly replyModel: Model<ReplayDocument>,
    ) {}
    async updateQuestion(id, question: {}) {}
    async getQuestion(id: string) {
        return await this.questionModel.findById(id);
    }
    async updateAnswer(id: string, answer: Answer) {
        const Answer = await (await this.answerModel.create(answer)).save();
        const AnswerId = Answer._id;
        const Question = await this.questionModel.findById(id);
        Question.answer.push(AnswerId);
        await Question.save();
        return await this.answerModel.find({}).exec();
    }
    async commentAnswer(id: string, comment: {}) {}
    async replayComment(id: string, replay: {}) {}
    async replayReplay(id: string, replay: {}) {}
}
