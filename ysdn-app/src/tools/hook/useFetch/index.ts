import { useState, useCallback } from 'react';
import useError from '../useError';


//update useFetch
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
        useCallback(
            async (url: RequestInfo, option: RequestInit) => {
                try {
                    const timeLimit = setTimeout(() => {
                        clearTimeout(timeLimit);
                    }, 5000);
                    getResponse(await fetch(url, option));
                } catch (e) {
                    setError(e.toString());
                }
            },
            [setError]
        ),
        e => setError(e),
    ];
}

export function useAjaxJson<T extends {} | [] = {}>(
    initialJson: Partial<T> = {}
): [
    [Partial<T>, boolean],
    Error,
    (url: string, option: RequestInit) => Promise<void>,
    (e: string) => void
] {
    const [json, setJson] = useState<Partial<T>>(initialJson);
    const [loading, setLoading] = useState<boolean>(true);
    const [Err, Catch] = useError();
    return [
        [json, loading],
        Err,
        useCallback(
            async (...rest) => {
                setLoading(true);
                try {
                    const res = await fetch(...rest);
                    if (res.status !== 200) {
                        throw new Error(
                            `FetchStatus : status : ${res.status},${res.statusText}`
                        );
                    } else {
                        const final = await res?.json().catch(Catch);
                        setJson(final);
                        setLoading(false);
                    }
                } catch (error) {
                    setLoading(false);
                    Catch(error);
                }
            },
            [Catch]
        ),
        Catch,
    ];
}
