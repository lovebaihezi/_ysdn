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

    @Post('FpGrowth')
    async getFpGrowth(@Body() { sup }: { sup: number }) {
        console.log(sup);
        const t = await this.adminService.fpGrowth(0.01);
        console.table(t);
        t.sort((a, b) => a.support - b.support);
        return t;
    }
    @Post('kmeans')
    getKmeans(@Body() { k }: { k: number }) {
        return this.adminService.kmeans(k);
    }
    // @Get('decision')
    // async getDecision(@Body() { tags }: { tags: string[] }) {
    //     return this.adminService.decide(tags);
    // }
}
