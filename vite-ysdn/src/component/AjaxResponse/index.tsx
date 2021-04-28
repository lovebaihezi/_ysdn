import { Skeleton } from 'antd';
import React, { useEffect, useMemo } from 'react';
import { FC } from 'react';
import { useFetchJson, useFetchProps } from '../../tools/hook/useFetch';
import AjaxError from '../Result';

export type AjaxProp<T> = {
    Request: useFetchProps;
    Component: Component<T>;
    Waiting?:
        | (({ loading }: { loading?: boolean }) => JSX.Element)
        | FC<{ loading?: boolean }>;
    Result?:
        | (({ error }: { error?: Error }) => JSX.Element)
        | FC<{ error?: Error }>;
};

export type Component<T> = FC<{ Response: T }>;

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
