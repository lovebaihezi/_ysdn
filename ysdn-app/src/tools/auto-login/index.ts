import { useState } from 'react';
import { user, objectId } from '../../interface';
import { useAjaxJson } from '../hook/useFetch';
export default function useAutoLogin(ID: null | string) {
    const [final, Error, Get, Catch] = useAjaxJson<
        false | (user & objectId) | { msg: string }
    >(false);
    return [final, Error, async () => {}];
}
 