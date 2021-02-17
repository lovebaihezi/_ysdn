import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { useState, useEffect } from 'react';

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
export default function useJsonFetch<
    T extends basicNetResponse = basicNetResponse
>(state: T): [T, Function] {
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

const useEveryFetch: () => [
    Response | undefined,
    Error | undefined,
    (url: string, options: RequestInit) => Promise<void>,
    (e: Error) => void
] = () => {
    const [response, setResponse] = useState<Response>();
    const [error, setError] = useState<Error>();
    return [
        response,
        error,
        async (url, options) => {
            try {
                const res = await fetch(url, options);
                setResponse(res);
            } catch (e) {
                setError(e);
            }
        },
        (e: Error) => {
            setError(e);
        },
    ];
};

const useJSONFetch = () => {
    const [res, setRes] = useState<AxiosResponse>();
    const [err, setError] = useState<Error>();
    return [
        res,
        err,
        async (options: AxiosRequestConfig) => {
            setRes(await axios(options));
        },
        (e: Error) => {
            setError(e);
        },
    ];
};

export { useEveryFetch, useJSONFetch };
