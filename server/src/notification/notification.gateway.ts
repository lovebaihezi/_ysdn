import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';

@WebSocketGateway()
export class NotificationGateway {
    @SubscribeMessage('message')
    handleMessage(client: any, payload: any): string {
        console.log(1);
        return 'Hello world!';
    }
}
