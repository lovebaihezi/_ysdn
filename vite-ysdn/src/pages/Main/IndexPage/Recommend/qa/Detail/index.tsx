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
import AvatarLink from '../../../../../../component/AvatarLink';
import { Link } from 'react-router-dom';
import UserLink from '../../../../../../component/UserLink';
import {
    // AnswerButton,
    FollowButton,
    LikeButton,
    ReadButton,
} from '../../../../../../component/ActionButton';
import { useUserDetail } from '../../../../../../auth';

const QACard: FC<{ QA: AjaxJson.IndexDetailQA }> = ({ QA }) => {
    const [user] = useUserDetail();
    return (
        <Col
            span={22}
            offset={1}
            style={{ margin: '2px 0' }}
            className="Detail"
        >
            <Link to={`/QA/${QA._id}`}>
                <Row>
                    <Col span={24}>
                        <Card
                            bordered={false}
                            bodyStyle={{ padding: 0 }}
                            headStyle={{ padding: 0 }}
                            actions={[
                                <FollowButton
                                    amount={0}
                                    initial={
                                        user
                                            ? user.like.questions.includes(
                                                  QA._id,
                                              )
                                            : false
                                    }
                                />,
                                // <AnswerButton amount={0} />,
                                <LikeButton
                                    type={'article'}
                                    amount={
                                        QA.approval - QA.disapproval ? 0 : 0
                                    }
                                    initial={
                                        user
                                            ? user.like.questions.includes(
                                                  QA._id,
                                              )
                                            : false
                                    }
                                    id={QA._id}
                                />,
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
                                    <UserLink user={QA.author} />
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
            </Link>
        </Col>
    );
};
//TODO : finish this!
const DetailQA: Component<AjaxJson.IndexDetailQA[]> = ({ Response }) => {
    return (
        <Row>
            <Col span={22} offset={1}>
                <Card
                    bordered={false}
                    bodyStyle={{ padding: '2px 16px' }}
                    title="QA"
                    extra={
                        <Link to="/QAs">
                            <strong>{`more >`}</strong>
                        </Link>
                    }
                >
                    <Row>
                        {Response.map((QA) => (
                            <QACard key={QA._id} QA={QA} />
                        ))}
                    </Row>
                </Card>
            </Col>
        </Row>
    );
};

export default DetailQA;
