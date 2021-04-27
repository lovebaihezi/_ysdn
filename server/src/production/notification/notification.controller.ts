import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Sse,
} from '@nestjs/common';
import { NotificationService } from './notification.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { Observable, interval } from 'rxjs';
import { map } from 'rxjs/operators';
@Controller('notification')
export class NotificationController {
    constructor(private readonly notificationService: NotificationService) {}

    @Sse(':username')
    //: Observable<MessageEvent<{ data: string }>>
    sse(@Param('username') username: string) {
        return interval(10000000).pipe(map(() => ({ data: { hello: '123' } })));
    }

    @Post()
    create(@Body() createNotificationDto: CreateNotificationDto) {
        return this.notificationService.create(createNotificationDto);
    }

    @Get()
    findAll() {
        return this.notificationService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.notificationService.findOne(+id);
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateNotificationDto: UpdateNotificationDto,
    ) {
        return this.notificationService.update(+id, updateNotificationDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.notificationService.remove(+id);
    }
}
