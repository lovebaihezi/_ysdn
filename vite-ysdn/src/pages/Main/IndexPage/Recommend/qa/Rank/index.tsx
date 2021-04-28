import { Card, Col, Divider, Row } from 'antd';
import Avatar from 'antd/lib/avatar/avatar';
import React from 'react';
import Ajax, { Component } from '../../../../../../component/AjaxResponse';
import { AjaxJson } from '../../../../../../interface';
import { EyeOutlined, LikeOutlined } from '@ant-design/icons';
import AvatarLink from '../../../../../../component/AvatarLink';
import UserLink from '../../../../../../component/UserLink';
import { Link } from 'react-router-dom';
import {
    LikeButton,
    ReadButton,
} from '../../../../../../component/ActionButton';
import { useUserDetail } from '../../../../../../auth';

//TODO : finish this!
const QARank: Component<AjaxJson.IndexRankQA[]> = ({ Response }) => {
    const [user] = useUserDetail();
    return (
        <Card title="Rank" bodyStyle={{ padding: '1px 16px' }}>
            <Row>
                {Response.slice(0, 10).map((QA, index) => (
                    <Col key={QA._id} span={24}>
                        <Link to={`/QA/${QA._id}`}>
                            <Row>
                                <Col span={6}></Col>
                                <Col span={18} style={{ cursor: 'pointer' }}>
                                    <Card
                                        bordered={false}
                                        bodyStyle={{ padding: 0 }}
                                        title={QA.title}
                                        headStyle={{ padding: 0 }}
                                        actions={[
                                            <UserLink user={QA.author} />,
                                            <LikeButton
                                                type={'article'}
                                                amount={
                                                    QA.approval - QA.disapproval
                                                        ? 0
                                                        : 0
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
                                            <ReadButton
                                                amount={QA.read}
                                                link={`/QA/${QA._id}`}
                                            />,
                                        ]}
                                    />
                                </Col>
                            </Row>
                        </Link>
                    </Col>
                ))}
            </Row>
        </Card>
    );
};

export default QARank;
