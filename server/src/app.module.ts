import { NotificationModule } from './notification/notification.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductionModule } from './production/production.module';
import { SearchModule } from './search/search.module';
import { MonographicModule } from './monographic/monographic.module';
import { AdminModule } from './admin/admin.module';

@Module({
    imports: [
        MongooseModule.forRoot('mongodb://localhost:27017/server'),
        UserModule,
        ProductionModule,
        SearchModule,
        MonographicModule,
        NotificationModule,
        AdminModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
