import { Auth, User } from '../schema/user.schema';

export class LikedRefDto {
    article: string[];

    video: string[];

    comment: string[];

    tag: string[];

    question: string[];

    answer: string[];
}

export class AuthDto implements Auth {
    username: string;
    password: string;
    email?: string;
}

export class UserDto implements User {
    Auth: string; // |-> ref to Auth, this will be used when check user account valid
    nickname: string;
    avatarUrl?: string;
    backgroundImage?: string;
    liked: LikedRefDto;
}

export class UserInfoDto {
    username: string;
    password: string;
    email?: string;
}
