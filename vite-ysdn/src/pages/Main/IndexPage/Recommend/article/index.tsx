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
        <AR Response={Response.slice(0, 10)} />
    </Suspense>
);

const DetailArticle: Component<AjaxJson.IndexDetailArticle[]> = ({
    Response,
}) => (
    <Suspense fallback={<Skeleton />}>
        <AD Response={Response.slice(0, 10)} />
    </Suspense>
);

const articleRankRequest: useFetchProps = {
    url: baseurl + '/article/rank',
};

const articleDetailRequest: useFetchProps = {
    url: baseurl + '/article/recommend',
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
