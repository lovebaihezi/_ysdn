import { useState, useCallback } from 'react';
import useError from '../useError';

// test passed
export const PromiseTimeout = <restProp extends Array<any> = []>(
    time: number,
    ...rest: restProp
) =>
    new Promise<void>((access, denied) => {
        const tricker = setTimeout(
            (...rest) => {
                clearTimeout(tricker);
                try {
                    access(...rest);
                } catch (error) {
                    denied(error);
                }
            },
            time,
            ...rest
        );
    });

// TODO :  redesign it !!!
export default function useTimeout(): [
    boolean,
    Error | undefined,
    (time: number) => Promise<void>
] {
    const [timeout, SetTimeout] = useState<boolean>(false);
    const [error, setError] = useError();
    return [
        timeout,
        error,
        useCallback(
            time =>
                PromiseTimeout(time)
                    .then(() => {
                        SetTimeout(true);
                    })
                    .catch(_ => setError(_.toString())),
            [setError]
        ),
    ];
}
