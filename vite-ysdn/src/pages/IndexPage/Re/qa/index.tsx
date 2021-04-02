import { Card, Col, Divider, Row, Skeleton } from 'antd';
import Avatar from 'antd/lib/avatar/avatar';
import React, { lazy, Suspense } from 'react';
import { baseurl } from '../../../../auth';
import Ajax, { Component } from '../../../../component/AjaxResponse';
import { AjaxJson } from '../../../../interface';
import { useFetchProps } from '../../../../tools/hook/useFetch';
const AR = lazy(() => import('./Rank'));
const AD = lazy(() => import('./Detail'));

const QARank: Component<AjaxJson.IndexRankQA[]> = ({ Response }) => (
    <Suspense fallback={<Skeleton />}>
        <AR Response={Response.slice(0, 7)} />
    </Suspense>
);

const DetailQA: Component<AjaxJson.IndexDetailQA[]> = ({ Response }) => (
    <Suspense fallback={<Skeleton />}>
        <AD Response={Response.slice(0, 5)} />
    </Suspense>
);

const QARankRequest: useFetchProps = {
    url: baseurl + '/index/QAs/rank',
    option: { method: 'POST' },
};

const QADetailRequest: useFetchProps = {
    url: baseurl + '/index/QAs/recommend',
    option: { method: 'POST' },
};

export default function IndexQA() {
    return (
        <>
            <Divider />
            <Row>
                <Col span={18}>
                    <Ajax Request={QADetailRequest} Component={DetailQA} />
                </Col>
                <Col span={6}>
                    <Ajax Request={QARankRequest} Component={QARank} />
                </Col>
            </Row>
        </>
    );
}
