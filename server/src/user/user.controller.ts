import {
    Body,
    Controller,
    Get,
    Header,
    Param,
    Post,
    UploadedFiles,
    UseInterceptors,
} from '@nestjs/common';
import { UserCreateDto } from './user.dto';
import { UserService } from './user.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';

export class UpdateUserDto {
    avatarUrl: string;
    backgroundImage: string;
    email: string;
    nickname: string;
}

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

    @Post('update/:userID/avatar')
    @UseInterceptors(FilesInterceptor('avatar'))
    updateImage(
        @Param('userID') userID: string,
        @UploadedFiles() files: Express.Multer.File,
    ) {
        return files;
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

    @Post('completeInformation/:username')
    async completeInformation(
        @Param('username') username: string,
        @Body() updateUserDto: UpdateUserDto,
    ) {
        return this.userModel.updateUser(username, updateUserDto);
    }
}
