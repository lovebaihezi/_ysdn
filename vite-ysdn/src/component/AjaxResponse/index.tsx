import { Skeleton } from 'antd';
import React, { ReactNode, useEffect, useMemo } from 'react';
import { FC } from 'react';
import { useFetchJson, useFetchProps } from '../../tools/hook/useFetch';
import AjaxError from '../Result';

export type AjaxProp<T> = {
    Request: useFetchProps;
    Component: Component<T>;
    Waiting?: WaitingType;
    Result?: ResultType;
};

export type Component<T> = FC<{ Response: T }>;
export type WaitingType =
    | (({ loading }: { loading?: boolean }) => JSX.Element)
    | FC<{ loading?: boolean }>;
export type ResultType =
    | FC<{ error?: Error }>
    | (({ error }: { error?: Error }) => JSX.Element);

export default function Ajax<T>({
    Request,
    Component,
    Waiting,
    Result,
}: AjaxProp<T>): JSX.Element {
    const [[response, loading, error], Fetch, Catch] = useFetchJson<T>(Request);
    useEffect(() => {
        Fetch().catch(Catch);
    }, []);
    if (response) {
        return <Component Response={response} />;
    } else if (error) {
        return Result ? <Result error={error} /> : <AjaxError error={error} />;
    } else {
        return Waiting ? <Waiting loading={loading} /> : <Skeleton />;
    }
}
