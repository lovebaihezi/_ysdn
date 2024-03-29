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
    Query,
    Put,
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
    async login(
        @Body() { username, password }: { username: string; password: string },
    ) {
        return await this.userService.userLogin(username, password);
    }

    @Post('/update/:username/tags')
    async updateUserTag(
        @Param('username') username: string,
        @Body() tags: string[],
    ) {
        return this.userService.userTagChoose(username, tags);
    }

    @Post('update/:username/avatar')
    @UseInterceptors(FilesInterceptor('avatar', 1))
    async updateImage(
        @Param('username') username: string,
        @UploadedFiles() [file]: Express.Multer.File[],
    ) {
        await this.userService.updateAvatar(username, file);
    }

    @Post('userFollow')
    async findUserFollow(@Query('username') username: string) {
        return this.userService.UserFollow(username);
    }

    @Get('find/:username/follow')
    async getActivity(@Param('username') username: string) {
        return this.userService.UserFollow(username);
    }

    @Get('userInfo/:username/:tag')
    async userFollowNumber(
        @Param('username') username: string,
        @Param('tag') tag: string,
    ) {
        return this.userService.getUserInfo(username, tag);
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

    @Get('/:username/userProduct/:name')
    async getUserUserProductByName(
        @Param('username') username: string,
        @Param('name') name: string,
    ) {
        return this.userService.getUserProduct(username, name);
    }

    @Put('update/:username/:follow')
    async userFollow(
        @Param('username') username: string,
        @Param('follow') follow: string,
    ) {
        return this.userService.followUser(follow, username);
    }
}
