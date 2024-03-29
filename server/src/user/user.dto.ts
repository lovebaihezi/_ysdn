import { AjaxJson } from 'src/interface';
export class UserDto implements AjaxJson.userDetail {
    like: AjaxJson.like;
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

export class UserCreateDto {
    username: string;
    password: string;
    'confirm-password': string;
}
