import { Module } from '@nestjs/common';
import { ArticleModule } from './article/article.module';
import { VideoModule } from './video/video.module';
import { MonographicModule } from './monographic/monographic.module';
import { ActivityModule } from './activity/activity.module';
import { TagModule } from './tag/tag.module';
import { NotificationModule } from './notification/notification.module';
import { QaModule } from './qa/qa.module';

@Module({
    imports: [
        ArticleModule,
        VideoModule,
        QaModule,
        MonographicModule,
        ActivityModule,
        TagModule,
        NotificationModule,
    ],
    controllers: [],
    providers: [],
})
export class ProductionModule {}
