import { Module } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleController } from './article.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schema/user.schema';
import { Article, ArticleSchema } from 'src/schema/production.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: User.name, schema: UserSchema },
            { name: Article.name, schema: ArticleSchema },
        ]),
    ],
    controllers: [ArticleController],
    providers: [ArticleService],
})
export class ArticleModule {}
