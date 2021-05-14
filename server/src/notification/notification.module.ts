import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Notification, NotificationSchema } from '../schema/user.schema';
import { NotificationGateway } from './notification.gateway';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Notification.name, schema: NotificationSchema },
        ]),
    ],
    controllers: [],
    providers: [NotificationGateway],
})
export class NotificationModule {}
