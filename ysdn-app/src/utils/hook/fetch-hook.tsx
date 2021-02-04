import { useState } from 'react';

enum netResponse {
    fulfilled,
    startFetching,
    inFetching,
    inParsing,
    inErroring,
}

export interface basicNetResponse extends Object {
    error?: string | Error | object | any;
    netResponse?: boolean;
    errorMessage: string;
    responseType: string;
    response: string | object | null;
}

//only for json and string
export default function useJsonFetch<T extends basicNetResponse = basicNetResponse>(
    state: T
): [T, Function] {
    const [Response, setResponse] = useState<T>({
        ...state,
        netResponse: netResponse.startFetching,
        error: 'nothing good or bad happened',
    });
    return [
        Response,
        async (url: string, request: Request) => {
            try {
                const response = await fetch(url, request);
                setResponse({
                    ...Response,
                    netResponse: netResponse.inFetching,
                });
                const resString = await response.text();
                setResponse({
                    ...Response,
                    netResponse: netResponse.inParsing,
                });
                try {
                    const res = JSON.parse(resString);
                    setResponse({ ...Response, responseType: 'Object', res });
                } catch (e) {
                    setResponse({
                        ...Response,
                        responseType: 'string',
                        resString,
                    });
                }
                setResponse({
                    ...Response,
                    netResponse: netResponse.fulfilled,
                });
            } catch (error) {
                setResponse({
                    ...Response,
                    netResponse: netResponse.inErroring,
                    errorMessage: `error + ${error.toString()}`,
                });
            }
        },
    ];
}

export function useEveryFetch(url: string) {
    const [response, setResponse] = useState<Promise<Response>>(
        new Promise(() => {})
    );
    const [error, setError] = useState<string>('');
    return [
        [response, error],
        async (options: RequestInit) => {
            try {
                const res = fetch(url, options);
                setResponse(res);
            } catch (e) {
                setError(e);
            }
        },
    ];
}
