import { Col, Divider, Row } from 'antd';
import React from 'react';
import { FetchFC, renderFetchResult } from '../../../../FC/FetchFC';
import { AjaxJson } from '../../../../interface';

const VideoCard: renderFetchResult<AjaxJson.video[]> = ({ fetchResult }) => {
    return <>{fetchResult}</>;
};

const RankCard: renderFetchResult<AjaxJson.video[]> = ({ fetchResult }) => {
    return <>{fetchResult}</>;
};

export default function VideoGrid() {
    <Row style={{ padding: 45 }}>
        <Col span={20} offset={2} style={{ overflow: 'hidden' }}>
            <Divider orientation="left">
                <h2>Video</h2>
            </Divider>
            <Row>
                <Col span={16}>
                    <Row>
                        {FetchFC<AjaxJson.video[]>([
                            { url: '/videos/all', option: { method: 'POST' } },
                            VideoCard,
                        ])}
                    </Row>
                </Col>
                <Col span={8}>
                    <Row>
                        {FetchFC<AjaxJson.video[]>([
                            { url: '/videos/rank', option: { method: 'POST' } },
                            RankCard,
                        ])}
                    </Row>
                </Col>
            </Row>
        </Col>
    </Row>;
}
