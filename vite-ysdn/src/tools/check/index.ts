import { AjaxJson } from '../../interface';

type x = keyof AjaxJson.userDetail;

export default function check(S: AjaxJson.userDetail) {
    // const keys = [
    //     'id',
    //     'username',
    //     'nickname',
    //     'tags',
    //     'marks',
    //     'liked',
    //     'videos',
    //     'answers',
    //     'articles',
    //     'questions',
    //     'activities',
    //     'avatarUrl',
    //     'follow',
    //     'follower',
    //     'backgroundImage',
    //     'notifications',
    // ];
    // const x = Object.keys(S);
    // if (x.length !== keys.length) {
    //     return false;
    // } else {
    //     return x.every((key) => keys.includes(key));
    // }
    return true;
}
