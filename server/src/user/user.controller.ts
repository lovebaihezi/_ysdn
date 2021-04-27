import {
    Body,
    Controller,
    Get,
    Header,
    HttpCode,
    Param,
    Post,
    Res,
} from '@nestjs/common';
import { Response } from 'express';
import { AjaxJson } from 'src/interface';
import { UserCreateDto } from './user.dto';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly UserService: UserService) {}
    @Post('login')
    //: Promise<AjaxJson.userDetail | AjaxJson.responseMessage>
    async login(
        @Body() { username, password }: { username: string; password: string },
    ) {
        return await this.UserService.userLogin(username, password);
    }
    @Post('register')
    //: Promise<AjaxJson.userDetail | AjaxJson.responseMessage>
    async register(@Body() userInfo: UserCreateDto) {
        return this.UserService.userRegister(userInfo);
    }
    @Post('tokenLogin')
    @Header('Content-Type', 'application/json')
    async tokenLogin(@Body() { id }: { id: string }) {
        return this.UserService.tokenLogin(id);
    }
    @Get(':username')
    async getUser(@Param('username') username: string) {
        return this.UserService.afterAuthGetUser(username);
    }
    // @Post('completeInformation')
    // async completeInformation(): Promise<AjaxJson.responseMessage> {}
}
