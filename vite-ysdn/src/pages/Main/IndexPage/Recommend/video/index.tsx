import { Card, Col, Divider, Row, Skeleton } from 'antd';
import React, { lazy, Suspense } from 'react';
import { baseurl } from '../../../../../auth';
import Ajax, { Component } from '../../../../../component/AjaxResponse';
import { AjaxJson } from '../../../../../interface';
import { useFetchProps } from '../../../../../tools/hook/useFetch';

const VR = lazy(() => import('./Rank'));
const VD = lazy(() => import('./Detail'));

const VideoRank: Component<AjaxJson.video[]> = ({ Response }) => (
    <Suspense fallback={<Skeleton />}>
        <VR Response={Response.slice(0, 3)} />
    </Suspense>
);

const DetailVideo: Component<AjaxJson.video[]> = ({ Response }) => (
    <Suspense fallback={<Skeleton />}>
        <VD Response={Response.slice(0, 3)} />
    </Suspense>
);

const videoRankRequest: useFetchProps = {
    url: baseurl + '/video/rank',
};

const videoDetailRequest: useFetchProps = {
    url: baseurl + '/video/recommend',
};

export default function IndexVideo() {
    return (
        <Row>
            <Divider />
            <Col span={18}>
                <Ajax Request={videoDetailRequest} Component={VD} />
            </Col>
            <Col span={6}>
                <Ajax Request={videoRankRequest} Component={VR} />
            </Col>
        </Row>
    );
}
