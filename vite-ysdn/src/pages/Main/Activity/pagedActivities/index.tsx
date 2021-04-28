import { Button, Card, Col, Row, Tag } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import { Component } from '../../../../component/AjaxResponse';
import { AjaxJson } from '../../../../interface';
import { ClockCircleOutlined } from '@ant-design/icons';
import {
    LikeButton,
    MarkButton,
    CommentButton,
    ReadButton,
} from '../../../../component/ActionButton';
import { useUserDetail } from '../../../../auth';

const time = (S: Date, E: Date) => {
    const now = new Date();
    if (E > now) {
        return 'ended';
    } else if (S < now) {
        return 'in coming';
    } else {
        return 'holding';
    }
};
const PagedActivities: Component<AjaxJson.activities[]> = ({ Response }) => {
    const [user] = useUserDetail();
    return (
        <Row>
            {Response.map((activity) => (
                <Col
                    span={11}
                    style={{ margin: '0 0 24px 0', padding: 12 }}
                    offset={1}
                >
                    <Link to={`/activity/${activity.toString()}`}>
                        <Card
                            title={
                                <>
                                    <Tag>
                                        {time(
                                            activity.startTime,
                                            activity.endTime,
                                        )}
                                    </Tag>
                                    {activity.title}
                                </>
                            }
                            actions={[
                                <LikeButton
                                    type="activity"
                                    amount={
                                        activity.approval - activity.disapproval
                                    }
                                    initial={
                                        user
                                            ? user.like.activities.includes(
                                                activity._id,
                                              )
                                            : false
                                    }
                                    id={activity._id}
                                />,
                                <MarkButton
                                    amount={activity.markAmount}
                                    type="activity"
                                    initial={
                                        user
                                            ? user.marks.includes(activity._id)
                                            : false
                                    }
                                    id={activity._id}
                                />,
                                <CommentButton amount={12} link={''} />,
                                <ReadButton amount={12} link={''} />,
                                <Button
                                    type={
                                        activity.endTime > new Date()
                                            ? 'default'
                                            : 'primary'
                                    }
                                >
                                    sign up
                                </Button>,
                            ]}
                        >
                            <Row>
                                <Col
                                    style={{ height: 100, overflow: 'hidden' }}
                                    span={24}
                                >
                                    {activity.briefIntro}
                                </Col>
                            </Row>
                            <Row>
                                <Col span={24} style={{ padding: 12 }}>
                                    {activity.tags.map((tag, index) => (
                                        <span
                                            style={{ padding: '0 12' }}
                                            key={tag + index}
                                        >
                                            <Link
                                                to={`/tags/${tag}`}
                                                style={{ color: 'gray' }}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                }}
                                            >
                                                # {tag}
                                            </Link>
                                        </span>
                                    ))}
                                </Col>
                            </Row>
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
                        </Card>
                    </Link>
                </Col>
            ))}
        </Row>
    );
};

export default PagedActivities;
