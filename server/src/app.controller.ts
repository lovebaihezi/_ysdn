import { Body, Controller, HttpCode, Post, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';

class adminAccount {
    username: string;
    password: string;
}

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}
    @Post('/admin/login')
    async AdminLogin(@Body() account: adminAccount, @Res() res: Response) {
        if (
            account.username === 'administrator' &&
            account.password === 'administrator'
        ) {
            res.sendStatus(200);
        } else {
            res.sendStatus(403);
        }
    }
}
