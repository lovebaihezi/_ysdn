import { Module } from '@nestjs/common';
import { NotificationGateway } from './notification.gateway';

@Module({
    imports: [],
    controllers: [],
    providers: [NotificationGateway],
})
export class NotificationModule {}
