import { Card, Col, Divider, Row, Skeleton } from 'antd';
import Avatar from 'antd/lib/avatar/avatar';
import React, { lazy, Suspense } from 'react';
import { baseurl } from '../../../../auth';
import Ajax, { Commponent } from '../../../../component/AjaxResponse';
import { AjaxJson } from '../../../../interface';
import { useFetchProps } from '../../../../tools/hook/useFetch';
const AR = lazy(() => import('./Rank'));
const AD = lazy(() => import('./Detail'));

const ArticleRank: Commponent<AjaxJson.IndexRankArticle[]> = ({ Response }) => (
    <Suspense fallback={<Skeleton />}>
        <AR Response={Response.slice(0, 7)} />
    </Suspense>
);

const DetailArticle: Commponent<AjaxJson.IndexDetailArticle[]> = ({
    Response,
}) => (
    <Suspense fallback={<Skeleton />}>
        <AD Response={Response.slice(0, 5)} />
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
                        Requset={articleDetailRequest}
                        Component={DetailArticle}
                    />
                </Col>
                <Col span={6}>
                    <Ajax
                        Requset={articleRankRequest}
                        Component={ArticleRank}
                    />
                </Col>
            </Row>
        </>
    );
}
