import { useState, useEffect, useCallback } from 'react';
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

export function useAjaxJson<T extends {} = {}>(
    initialJson: Partial<T> = {}
): [
    Partial<T>,
    Error,
    (url: string, option: RequestInit) => Promise<void>,
    (e: string) => void
] {
    const [json, setJson] = useState<Partial<T>>(initialJson);
    const [Err, Catch] = useError();
    return [
        json,
        Err,
        useCallback(
            async (...rest) => {
                try {
                    setJson(await (await fetch(...rest))?.json().catch(Catch));
                } catch (error) {
                    Catch(error);
                }
            },
            [Catch]
        ),
        Catch,
    ];
}
