import { CallEnd } from '@material-ui/icons';
import { useState, useEffect } from 'react';
import useError from '../useError';

export default function useFetch(): [
    Response | undefined,
    Error,
    (url: string, option: RequestInit) => Promise<void>,
    (e: string) => void
] {
    const [response, getResponse] = useState<Response>();
    const [error, setError] = useError();
    return [
        response,
        error,
        async (url, option) => {
            try {
                getResponse(await fetch(url, option));
            } catch (e) {
                setError(e.toString());
            }
        },
        e => setError(e),
    ];
}

export function useAjaxJson<T extends {} = {}>(initialJson: Partial<T> = {}) {
    const [res, Err, Fetch, Catch] = useFetch();
    const [json, setJson] = useState<Partial<T>>(initialJson);
    useEffect(() => {
        if (res) {
            res.json().then(setJson).catch(Catch);
        }
    }, [Catch, res]);
    return [
        json,
        Err,
        async (url: string, option: RequestInit) => {
            await Fetch(url, option);
        },
        Catch,
    ];
}
