import { Button, Card, Col, Row, Tag } from 'antd';
import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { Component } from '../../../../component/AjaxResponse';
import { AjaxJson } from '../../../../interface';
import {
    ClockCircleOutlined,
    LikeOutlined,
    PlusOutlined,
    EyeOutlined,
    StarOutlined,
} from '@ant-design/icons';
import Action from '../../../../component/Action';
import QA from '../../QA';

const time = (S: Date, E: Date) => {
    const now = new Date();
    if (E > now) {
        return 'end';
    } else if (S < now) {
        return 'waiting';
    } else {
        return 'in';
    }
};

const PagedActivities: Component<AjaxJson.activities[]> = ({ Response }) => {
    return (
        <Row>
            {Response.map((activity) => (
                <Col
                    span={11}
                    style={{ margin: '0 0 24px 0', padding: 12 }}
                    offset={1}
                >
                    <Card
                        title={
                            <>
                                <Tag>
                                    {time(activity.startTime, activity.endTime)}
                                </Tag>
                                {activity.title}
                            </>
                        }
                        actions={[
                            <Row
                                style={{
                                    padding: '10px 24px',
                                    alignItems: 'center',
                                }}
                            >
                                <Col span={12}>
                                    <Row>
                                        <Col
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                            }}
                                            span={8}
                                        >
                                            <EyeOutlined />
                                        </Col>
                                        <Col
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                            }}
                                            span={8}
                                        >
                                            <LikeOutlined />
                                            <span
                                                style={{ padding: '0 4px' }}
                                            ></span>
                                        </Col>
                                        <Col
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                            }}
                                            span={8}
                                        >
                                            <StarOutlined />
                                        </Col>
                                    </Row>
                                </Col>
                                <Col span={12}>
                                    <Row justify="end">
                                        <Button
                                            type={
                                                activity.endTime > new Date()
                                                    ? 'default'
                                                    : 'primary'
                                            }
                                        >
                                            sign up
                                        </Button>
                                    </Row>
                                </Col>
                            </Row>,
                        ]}
                    >
                        <Row>
                            <Col
                                style={{ height: 100, overflow: 'hidden' }}
                                span={24}
                            >
                                {activity.briefIntro}
                            </Col>
                            <Col span={24} style={{ padding: 12 }}>
                                {activity.tags.map((tag, index) => (
                                    <span
                                        style={{ padding: '0 12' }}
                                        key={tag + index}
                                    >
                                        <Link
                                            to={`/tags/${tag}`}
                                            style={{ color: 'gray' }}
                                        >
                                            # {tag}
                                        </Link>
                                    </span>
                                ))}
                            </Col>
                            <Col span={24}>
                                <Row>
                                    <Col flex="auto">
                                        <ClockCircleOutlined />
                                        {`${activity.startTime
                                            .toLocaleString()
                                            .slice(0, 13)
                                            .replace(
                                                'T',
                                                ' ',
                                            )}:00 - ${activity.endTime
                                            .toLocaleString()
                                            .slice(0, 13)
                                            .replace('T', ' ')}:00`}
                                    </Col>
                                    <Col span={4}>{activity.form}</Col>
                                    <Col span={4}>{`${activity.amount ?? 0}/${
                                        activity.max ?? 0
                                    }`}</Col>
                                </Row>
                            </Col>
                        </Row>
                    </Card>
                </Col>
            ))}
        </Row>
    );
};

export default PagedActivities;
