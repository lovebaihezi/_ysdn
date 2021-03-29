import { AjaxJson } from '../../interface';
import { useFetchJson } from '../hook/useFetch';

export default function useAutoLogin(
    tocken: string | false,
): [AjaxJson.user | undefined, () => Promise<void>, Error | undefined] {
    const [[user, l, e], autoLogin, c] = useFetchJson<AjaxJson.user>({
        url: `/getUserInfo`,
        option: {
            method: 'POST',
            headers: new Headers({ Authorization: tocken.toString() }),
        },
    });
    return [user, autoLogin, e];
}
