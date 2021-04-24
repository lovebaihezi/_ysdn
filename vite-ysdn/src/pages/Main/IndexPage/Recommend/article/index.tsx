import { Col, Divider, Row, Skeleton } from 'antd';
import React, { lazy, Suspense, useMemo } from 'react';
import { baseurl } from '../../../../../auth';
import Ajax, { Component } from '../../../../../component/AjaxResponse';
import { AjaxJson } from '../../../../../interface';
import { useFetchProps } from '../../../../../tools/hook/useFetch';
const AR = lazy(() => import('./Rank'));
const AD = lazy(() => import('./Detail'));

const ArticleRank: Component<AjaxJson.IndexRankArticle[]> = ({ Response }) => (
    <Suspense fallback={<Skeleton />}>
        {useMemo(
            () => (
                <AR Response={Response.slice(0, 7)} />
            ),
            [...Response.map(Object.values)].flat(),
        )}
    </Suspense>
);

const DetailArticle: Component<AjaxJson.IndexDetailArticle[]> = ({
    Response,
}) => (
    <Suspense fallback={<Skeleton />}>
        {useMemo(
            () => (
                <AD Response={Response.slice(0, 5)} />
            ),
            [...Response.map(Object.values)].flat(),
        )}
    </Suspense>
);

const articleRankRequest: useFetchProps = {
    url: baseurl + '/index/articles/rank',
    option: { method: 'POST' },
};

const articleDetailRequest: useFetchProps = {
    url: baseurl + '/index/articles/recommend',
    option: { method: 'POST' },
};

export default function IndexArticle() {
    return (
        <>
            <Divider />
            <Row>
                <Col span={18}>
                    <Ajax
                        Request={articleDetailRequest}
                        Component={DetailArticle}
                    />
                </Col>
                <Col span={6}>
                    <Ajax
                        Request={articleRankRequest}
                        Component={ArticleRank}
                    />
                </Col>
            </Row>
        </>
    );
}
