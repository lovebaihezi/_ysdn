import { Module } from '@nestjs/common';
import { ArticleModule } from './article/article.module';
import { VideoModule } from './video/video.module';
import { ActivityModule } from './activity/activity.module';
import { TagModule } from './tag/tag.module';
import { QaModule } from './qa/qa.module';

@Module({
    imports: [ArticleModule, VideoModule, QaModule, ActivityModule, TagModule],
    controllers: [],
    providers: [],
})
export class ProductionModule {}
