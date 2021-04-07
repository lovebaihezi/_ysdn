import { AjaxJson } from '../../interface';

export default function check(S: AjaxJson.userDetail) {
    const keys = [
        'username',
        'nickname',
        'avatarUrl',
        'notifications',
        'follow',
        'follower',
        'articles',
        'videos',
        'answers',
        'questions',
        'activities',
        'marks',
        'liked',
        'tags',
    ];
    const x = Object.keys(S);
    if (x.length !== keys.length) {
        return false;
    } else {
        return x.every((key) => keys.includes(key));
    }
}
