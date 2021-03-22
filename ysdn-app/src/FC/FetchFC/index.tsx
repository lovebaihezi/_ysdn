import { Button, Result, Skeleton } from 'antd';
import { FC, useEffect } from 'react';
import { useFetchJson } from '../../tools/hook/useFetch';

export type renderFetchResult<T> = FC<{ fetchResult: Partial<T> }>;

const Sure: FC<{ RLE: [any, boolean, Error | undefined] }> = ({ RLE: [result, loading, error], children }) => {
    return loading ? (
        <Skeleton />
    ) : error ? (
        <Result title={'Error'} subTitle={error?.message ?? 'error'} />
    ) : (
        <>{children}</>
    );
};

export function FetchFC<T>([{ url, option }, Component]: [{ url: string; option: RequestInit }, renderFetchResult<T>]) {
    const [RLE, Fetch, Catch] = useFetchJson<T>({ url, option });
    const [res] = RLE;
    useEffect(() => {
        Fetch().catch(Catch);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <Sure RLE={RLE}>
            {res ? (
                <Component fetchResult={res} />
            ) : (
                <Result
                    title='no result'
                    subTitle='please reload page'
                    children={<Button onClick={() => Fetch().catch(Catch)} children='reload' />}
                />
            )}
        </Sure>
    );
}
