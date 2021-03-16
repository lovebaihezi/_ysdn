import { useState, useCallback, useRef, useEffect } from 'react';
import useError from '../useError';

//update useFetch
export default function useFetch(): [
    Response | undefined,
    Error | undefined,
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
// TODO : need test : should canceled when unmount. (includes components which use this hook!)
// TODO : Or maybe you should redesign it ,but I dislike write url and option when i want to use it
// ! but i definitely dislike send paramter when i call useXXXX,
// ! but it seems that i have to write this hook in this way or maybe useRef to solve this
// ! maybe useRef could help me
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
