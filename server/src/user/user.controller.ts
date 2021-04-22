import { Body, Controller, Post } from '@nestjs/common';
import { AjaxJson } from 'src/interface';
import { UserInfoDto } from './user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly UserService: UserService) {}
    @Post('login')
    async login(
        @Body() { username, password }: { username: string; password: string },
    ): Promise<AjaxJson.userDetail | AjaxJson.responseMessage> {
        return this.UserService.userLogin(username, password);
    }
    @Post('register')
    async register(
        @Body() userInfo: UserInfoDto,
    ): Promise<AjaxJson.userDetail | AjaxJson.responseMessage> {
        return this.UserService.userRegister(userInfo);
    }
    // @Post('completeInformation')
    // async completeInformation(): Promise<AjaxJson.responseMessage> {}
}
