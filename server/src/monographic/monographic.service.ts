import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Article, ArticleDocument } from '../schema/production.schema';
import { CreateMonographicDto } from './dto/create-monographic.dto';
import { UpdateMonographicDto } from './dto/update-monographic.dto';

@Injectable()
export class MonographicService {
    constructor(
        @InjectModel(Article.name)
        private readonly articleModel: Model<ArticleDocument>,
    ) {}
    create(createMonographicDto: CreateMonographicDto) {
        return 'This action adds a new monographic';
    }

    findAll() {
        return `This action returns all monographic`;
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
