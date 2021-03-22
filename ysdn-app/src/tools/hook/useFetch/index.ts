import { useState, useCallback, useRef, useEffect } from 'react';
import useError from '../useError';

// this hook will be deprecated
export function useAjaxJson<T extends {} | [] = {}>(
    initialJson: Partial<T> = {}
): [
    [Partial<T>, boolean],
    Error | undefined,
    (url: string, option: RequestInit) => Promise<void>,
    (e: string | undefined) => void,
    () => void
] {
    const AbortRef = useRef<AbortController>(new AbortController());
    const MountRef = useRef<boolean>(false);
    const [json, setJson] = useState<Partial<T>>(initialJson);
    const [loading, setLoading] = useState<boolean>(true);
    const [Err, Catch] = useError();
    const Fetch = useCallback(
        async (url: string, option: RequestInit) => {
            AbortRef.current = new AbortController();
            const { signal } = AbortRef.current;
            setLoading(true);
            try {
                const res = await fetch(url, { signal, ...option });
                if (res.status !== 200) {
                    throw new Error(`FetchStatus : status : ${res.status},${res.statusText}`);
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
    );
    // const { current } = AbortRef;
    useEffect(() => {
        // *actually ,when i test this hook and its umount behavior,i could see : " fetch (pending) " --> "fetch (cancel)"
        // *but somehow, React still warn me : you haven't clean up the effect!
        // *umount happened when route switch to another page
        const { current } = AbortRef;
        MountRef.current = true;
        const Mount = MountRef;
        return () => {
            current.abort();
            Mount.current = false;
        };
    }, []);
    return [
        [json, loading],
        Err,
        Fetch,
        Catch,
        useCallback(() => {
            AbortRef.current.abort();
        }, []),
    ];
}

export type FetchJson<T> = [
    [Partial<T> | undefined, boolean, Error | undefined],
    () => Promise<void>,
    (e: any) => void
];
export type useFetchProps = { url: string; option: RequestInit };

export type useFetchJsonType = <T>({ url, option }: useFetchProps) => FetchJson<T>;

export const useFetchJson: useFetchJsonType = <T>({ url, option }: { url: string; option: RequestInit }) => {
    const [res, setRes] = useState<Partial<T>>();
    const [loading, setLoading] = useState<boolean>(false);
    const AbortRef = useRef<AbortController>(new AbortController());
    const [error, setError] = useState<Error>();
    const Catch = useCallback(
        (e: any) => {
            setLoading(false);
            setError(new Error(e));
        },
        [setLoading, setError]
    );
    const Fetch = useCallback(async () => {
        AbortRef.current = new AbortController();
        const { signal } = AbortRef.current;
        setLoading(true);
        const fetchResult = await fetch(url, { ...option, signal }).catch(Catch);
        fetchResult &&
            fetchResult?.status === 404 &&
            Catch(new Error(`get information from ${url} failed, which is 404 ${fetchResult?.statusText}`));
        fetchResult && fetchResult?.status !== 404 && setRes((await fetchResult.json().catch(Catch)) ?? null);
        setLoading(false);
    }, [Catch, option, url]);
    useEffect(() => {
        return () => AbortRef.current.abort();
    }, []);
    return [[res, loading, error], Fetch, Catch];
};
