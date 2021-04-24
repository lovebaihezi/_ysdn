import { Module } from '@nestjs/common';
import { ArticleModule } from './article/article.module';
import { VideoModule } from './video/video.module';
import { QaModule } from './qa/qa.module';
import { ActivitiesModule } from './activities/activities.module';
import { MonographicModule } from './monographic/monographic.module';

@Module({
    imports: [
        ArticleModule,
        VideoModule,
        QaModule,
        ActivitiesModule,
        MonographicModule,
    ],
    controllers: [],
    providers: [],
})
export class ProductionModule {}
