import { Card, Col, Divider, Row, Tag } from 'antd';
import Avatar from 'antd/lib/avatar/avatar';
import React from 'react';
import Ajax, { Component } from '../../../../../../component/AjaxResponse';
import { AjaxJson } from '../../../../../../interface';
import {
    EyeOutlined,
    LikeOutlined,
    CommentOutlined,
    StarOutlined,
} from '@ant-design/icons';
import { FC } from 'react';
import './Detail.css';
import AvatarLink from '../../../../../../component/avatarLink';

const QACard: FC<{ QA: AjaxJson.IndexDetailQA }> = ({ QA }) => (
    <Col
        span={22}
        onClick={(e) => {
            location.href = `/QA/${QA.id}`;
        }}
        offset={1}
        style={{ margin: '2px 0' }}
        className="Detail"
    >
        <Row>
            <Col span={24}>
                <Card
                    bordered={false}
                    bodyStyle={{ padding: 0 }}
                    headStyle={{ padding: 0 }}
                    actions={[
                        <Row justify="end">
                            <Col span={12}>
                                <Row className="actionContain">
                                    {QA.tags.slice(0, 4).map((tag) => (
                                        <Col
                                            key={tag}
                                            span={2}
                                            className="action"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                location.href = `/tags/${tag}`;
                                            }}
                                        >
                                            <Tag color="blue">{tag}</Tag>
                                        </Col>
                                    ))}
                                </Row>
                            </Col>
                            <Col span={12}>
                                <Row className="actionContain" justify="end">
                                    <Col className="action">
                                        <EyeOutlined />
                                        {QA.read}
                                    </Col>
                                    <Col className="action">
                                        <LikeOutlined />
                                        {QA.approval}
                                    </Col>
                                    <Col className="action">
                                        <CommentOutlined />
                                    </Col>
                                    <Col className="action">
                                        <StarOutlined />
                                    </Col>
                                </Row>
                            </Col>
                        </Row>,
                    ]}
                >
                    <Row className="actionContain">
                        <Col span={24} className="title action">
                            {QA.title}
                        </Col>
                        <Col
                            span={24}
                            style={{
                                display: 'flex',
                                justifyContent: 'flex-start',
                            }}
                        >
                            <AvatarLink
                                to={`/user/${QA.author.Account.auth}`}
                                src={QA.author.avatarUrl}
                                name={QA.author.Account.nickname}
                            />
                        </Col>
                        <Col
                            span={24}
                            style={{ height: 60, overflow: 'hidden' }}
                        >
                            {QA.content}
                        </Col>
                    </Row>
                </Card>
            </Col>
        </Row>
    </Col>
);

const DetailQA: Component<AjaxJson.IndexDetailQA[]> = ({ Response }) => {
    return (
        <Row>
            <Col span={22} offset={1}>
                <Card
                    bordered={false}
                    bodyStyle={{ padding: '2px 16px' }}
                    title="QA"
                    extra={
                        <strong
                            style={{ cursor: 'pointer' }}
                            onClick={(e) => {
                                location.href = '/QA';
                            }}
                        >{`more >`}</strong>
                    }
                >
                    <Row>
                        {Response.map((QA) => (
                            <QACard key={QA.id} QA={QA} />
                        ))}
                    </Row>
                </Card>
            </Col>
        </Row>
    );
};

export default DetailQA;
