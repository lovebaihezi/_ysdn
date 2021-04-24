import { Body, Controller, Post } from '@nestjs/common';
import { AjaxJson } from 'src/interface';
import { UserInfoDto } from './user.dto';
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
    async register(@Body() userInfo: UserInfoDto) {
        return this.UserService.userRegister(userInfo);
    }
    // @Post('completeInformation')
    // async completeInformation(): Promise<AjaxJson.responseMessage> {}
}
