import { AjaxJson } from 'src/interface';
export class UserDto implements AjaxJson.userDetail {
    id: string;
    marks: string[];
    liked: string[];
    follow: AjaxJson.userInfo[];
    follower: AjaxJson.userInfo[];
    notifications: AjaxJson.notification[];
    userProduct: AjaxJson.userProduct;
    nickname: string;
    avatarUrl: string;
    backgroundImage?: string;
    username: string;
    password: string;
    email: string;
    articles: string[];
    videos: string[];
    tags: string[];
    questions: string[];
    answers: string[];
    activities: string[];
}

export class UserInfoDto {
    username: string;
    password: string;
}
