import { Skeleton } from 'antd';
import React, { useEffect } from 'react';
import { FC } from 'react';
import { useFetchJson, useFetchProps } from '../../tools/hook/useFetch';
import AjaxError from '../result';

export type AjaxProp<T> = { Requset: useFetchProps; Component: Commponent<T> };

export type Commponent<T> = FC<{ Response: T }>;

export default function Ajax<T>({ Requset, Component }: AjaxProp<T>): JSX.Element {
    const [[response, loading, error], Fetch, Catch] = useFetchJson<T>(Requset);
    useEffect(() => {
        Fetch().catch(Catch);
    }, []);
    if (loading) {
        return <Skeleton />;
    } else if (response) {
        return <Component Response={response} />;
    } else {
        return <AjaxError error={error} />;
    }
}