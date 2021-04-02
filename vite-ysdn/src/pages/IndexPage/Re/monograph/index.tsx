import { Card, Col, Divider, Row } from 'antd';
import React from 'react';
import { baseurl } from '../../../../auth';
import Ajax, { Component } from '../../../../component/AjaxResponse';
import { AjaxJson } from '../../../../interface';
import { useFetchProps } from '../../../../tools/hook/useFetch';

import './monograph.css';

const MonographCard: Component<AjaxJson.monographic[]> = ({ Response }) => (
    <Row>
        <Col span={24} style={{ overflow: 'hidden' }}>
            <Divider />
            <Row wrap={false}>
                {Response.map((monograph) => (
                    <Col span={8} key={monograph.id} style={{ padding: 10 }}>
                        <Card
                            className="monographCard"
                            cover={
                                <img
                                    width="300px"
                                    height="250px"
                                    src={monograph.coverUrl}
                                />
                            }
                        >
                            <Row>
                                <Col span={24}>
                                    <strong className="title">
                                        {monograph.title}
                                    </strong>
                                </Col>
                                <Col span={24}>{monograph.modifyTime}</Col>
                            </Row>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Col>
    </Row>
);

const Request: useFetchProps = {
    url: baseurl + '/render/Monographic/all',
    option: { method: 'POST' },
};

export default function IndexMonograph() {
    return <Ajax Request={Request} Component={MonographCard} />;
}
