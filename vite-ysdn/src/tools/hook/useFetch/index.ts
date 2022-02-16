import { useState, useCallback, useRef, useEffect } from 'react';

export type FetchJson<T> = [
    [T | undefined, boolean, Error | undefined],
    () => Promise<void>,
    (e: any) => void,
];
export type useFetchProps = { url: string; option?: RequestInit };

export type useFetchJsonType = <T>({
    url,
    option,
}: useFetchProps) => FetchJson<T>;

const useAbortController = <T extends unknown[] = []>(deps: T) => {
    const AbortRef = useRef<AbortController>(new AbortController());
    useEffect(() => {
        AbortRef.current = new AbortController();
        return () => AbortRef.current.abort();
    }, deps);
    return AbortRef.current;
};

function useFetchJson<T>({
    url,
    option = {},
}: {
    url: string;
    option?: RequestInit;
}): FetchJson<T> {
    const [res, setRes] = useState<T>();
    const [loading, setLoading] = useState<boolean>(false);
    const AbortRef = useRef<AbortController>(new AbortController());
    const [error, setError] = useState<Error>();
    const Catch = useCallback(
        (e: any) => {
            setLoading(false);
            setError(new Error(e));
        },
        [setLoading, setError],
    );
    const Fetch = useCallback(async () => {
        AbortRef.current = new AbortController();
        const { signal } = AbortRef.current;
        setLoading(true);
        const fetchResult = await fetch(url, { ...option, signal }).catch(
            Catch,
        );
        fetchResult &&
            fetchResult?.status === 404 &&
            Catch(
                new Error(
                    `get information from ${url} failed, which is 404 ${fetchResult?.statusText}`,
                ),
            );
        fetchResult &&
            fetchResult?.status !== 404 &&
            setRes((await fetchResult.json().catch(Catch)) ?? null);
        setLoading(false);
    }, [Catch, option, url]);
    useEffect(() => () => AbortRef.current.abort(), []);
    return [[res, loading, error], Fetch, Catch];
}

export { useFetchJson, useAbortController };
