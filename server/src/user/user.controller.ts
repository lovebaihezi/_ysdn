import {
    Body,
    Controller,
    Get,
    Header,
    Param,
    Post,
    Res,
    UploadedFiles,
    UseInterceptors,
} from '@nestjs/common';
import { UserCreateDto } from './user.dto';
import { UserService } from './user.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Express, Response } from 'express';

export class UpdateUserDto {
    avatarUrl: string;
    backgroundImage: string;
    email: string;
    nickname: string;
}

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post('login')
    //: Promise<AjaxJson.userDetail | AjaxJson.responseMessage>
    async login(
        @Body() { username, password }: { username: string; password: string },
    ) {
        return await this.userService.userLogin(username, password);
    }

    @Post('update/:username/avatar')
    @UseInterceptors(FilesInterceptor('avatar', 1))
    async updateImage(
        @Param('username') username: string,
        @UploadedFiles() [file]: Express.Multer.File[],
    ) {
        await this.userService.updateAvatar(username, file);
    }

    @Get(':id/userProduct/:tag')
    async userProduct(@Param('id') id: string, @Param('tag') tag: string) {
        return this.userService.getUserProduction(id, tag);
    }

    @Get('avatar/:username/:avatar')
    async getUserAvatar(
        @Param('username') username: string,
        @Param('avatar') avatar: string,
        @Res() res: Response,
    ) {
        res.sendFile(await this.userService.findUserAvatar(username, avatar));
    }

    @Post('register')
    //: Promise<AjaxJson.userDetail | AjaxJson.responseMessage>
    async register(@Body() userInfo: UserCreateDto) {
        return this.userService.userRegister(userInfo);
    }

    @Post('tokenLogin')
    @Header('Content-Type', 'application/json')
    async tokenLogin(@Body() { id }: { id: string }) {
        return this.userService.tokenLogin(id);
    }

    @Get(':username')
    async getUser(@Param('username') username: string) {
        return this.userService.afterAuthGetUser(username);
    }

    @Post('completeInformation/:username')
    async completeInformation(
        @Param('username') username: string,
        @Body() updateUserDto: UpdateUserDto,
    ) {
        return this.userService.completeInformation(username, updateUserDto);
    }
}
