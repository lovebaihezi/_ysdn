import { Card, Col, Row, Skeleton } from 'antd';
import React, { lazy, Suspense } from 'react';
import { baseurl } from '../../../../auth';
import Ajax, { Commponent } from '../../../../component/AjaxResponse';
import { AjaxJson } from '../../../../interface';
import { useFetchProps } from '../../../../tools/hook/useFetch';

const VR = lazy(() => import('./Rank'));
const VD = lazy(() => import('./Detail'));

const VideoRank: Commponent<AjaxJson.video[]> = ({ Response }) => (
    <Suspense fallback={<Skeleton />}>
        <VR Response={Response.slice(0, 7)} />
    </Suspense>
);

const DetailVideo: Commponent<AjaxJson.video[]> = ({ Response }) => (
    <Suspense fallback={<Skeleton />}>
        <VD Response={Response.slice(0, 5)} />
    </Suspense>
);

const videoRankRequest: useFetchProps = {
    url: baseurl + '/index/videos/rank',
    option: { method: 'POST' },
};

const videoDetailRequest: useFetchProps = {
    url: baseurl + '/index/videos/recommend',
    option: { method: 'POST' },
};

export default function IndexVideo() {
    return (
        <Row>
            <Col span={16}>
                <Ajax Requset={videoDetailRequest} Component={VD} />
            </Col>
            <Col span={8}>
                <Ajax Requset={videoRankRequest} Component={VR} />
            </Col>
        </Row>
    );
}