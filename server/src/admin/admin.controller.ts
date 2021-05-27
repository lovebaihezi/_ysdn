import { Controller, Post, Body, Res, Get } from '@nestjs/common';
import { AdminService } from './admin.service';
import { Response } from 'express';

class adminAccount {
    username: string;
    password: string;
}

@Controller('admin')
export class AdminController {
    constructor(private readonly adminService: AdminService) {}
    @Post('/login')
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

    @Get('thisWeekArticle')
    getThisWeekArticleCount() {
        return this.adminService.thisWeekNewArticleCount();
    }

    @Get('thisWeekUser')
    getThisWeekUserCount() {
        return this.adminService.thisWeekNewUserCount();
    }

    @Get('wholeArticle')
    getWholeArticleCount() {
        return this.adminService.wholeTimeArticleCount();
    }

    @Get('wholeUser')
    getWholeUserCount() {
        return this.adminService.wholeTimeUserCount();
    }
}
