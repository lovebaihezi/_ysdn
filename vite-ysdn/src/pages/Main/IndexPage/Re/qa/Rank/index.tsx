import { Card, Col, Divider, Row } from 'antd';
import Avatar from 'antd/lib/avatar/avatar';
import React from 'react';
import Ajax, { Component } from '../../../../../../component/AjaxResponse';
import { AjaxJson } from '../../../../../../interface';
import { EyeOutlined, LikeOutlined } from '@ant-design/icons';
import AvatarLink from '../../../../../../component/avatarLink';

const QARank: Component<AjaxJson.IndexRankQA[]> = ({ Response }) => {
    return (
        <Card title="Rank" bodyStyle={{ padding: '1px 16px' }}>
            <Row>
                {Response.slice(0, 10).map((QA, index) => (
                    <Col key={QA.id} span={24}>
                        <Row>
                            <Col span={6}></Col>
                            <Col
                                span={18}
                                onClick={(e) => {
                                    location.href = `/QA/${QA.id}`;
                                }}
                                style={{ cursor: 'pointer' }}
                            >
                                <Card
                                    bordered={false}
                                    bodyStyle={{ padding: 0 }}
                                    title={QA.title}
                                    headStyle={{ padding: 0 }}
                                    actions={[
                                        <Row>
                                            <Col span={4}>
                                                <AvatarLink
                                                    to={`/user/${QA.authors[0].Account.auth}`}
                                                    name={
                                                        QA.authors[0].Account
                                                            .nickname
                                                    }
                                                />
                                            </Col>
                                            <Col span={20}>
                                                <Row justify="end">
                                                    <Col span={4}>
                                                        <EyeOutlined />
                                                    </Col>
                                                    <Col span={4}>
                                                        {QA.read}
                                                    </Col>
                                                    <Col span={4}>
                                                        <LikeOutlined />
                                                    </Col>
                                                    <Col span={4}>
                                                        {QA.approval}
                                                    </Col>
                                                </Row>
                                            </Col>
                                        </Row>,
                                    ]}
                                />
                            </Col>
                        </Row>
                    </Col>
                ))}
            </Row>
        </Card>
    );
};

export default QARank;
