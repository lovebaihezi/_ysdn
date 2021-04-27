import { Card, Col, Divider, Row } from 'antd';
import React from 'react';
import { Component } from '../../../../../../component/AjaxResponse';
import { AjaxJson } from '../../../../../../interface';

import {
    StarOutlined,
    EyeOutlined,
    LikeOutlined,
    CommentOutlined,
} from '@ant-design/icons';
import Avatar from 'antd/lib/avatar/avatar';
import AvatarLink from '../../../../../../component/avatarLink';
import UserLink from '../../../../../../component/userLink';

const VideoCard: Component<AjaxJson.video[]> = ({ Response }) => (
    <Row>
        <Col span={24} style={{ overflow: 'hidden' }}>
            <Row wrap={false}>
                {Response.map((video) => (
                    <Col span={8} key={video.id} style={{ padding: 10 }}>
                        <Card
                            className="monographCard"
                            cover={
                                <img
                                    width="300px"
                                    height="250px"
                                    src={video.coverImgUrl}
                                />
                            }
                            actions={[
                                <Row>
                                    <Col span={12}>
                                        <UserLink
                                            src={video.authors[0].avatarUrl}
                                            name={
                                                video.authors[0].Account.nickname
                                            }
                                        />
                                    </Col>
                                    <Col span={12}>
                                        <Row
                                            style={{
                                                alignItems: 'center',
                                                display: 'flex',
                                                height: '100%',
                                            }}
                                            justify="end"
                                        >
                                            <Col flex="auto">
                                                <EyeOutlined />
                                                {video.read}
                                            </Col>
                                            <Col flex="auto">
                                                <LikeOutlined />
                                                {video.approval}
                                            </Col>
                                            <Col flex="auto">
                                                <CommentOutlined />
                                                {video.commentsAmount}
                                            </Col>
                                            <Col flex="auto">
                                                <StarOutlined />
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>,
                            ]}
                        >
                            <Row>
                                <Col span={24}>
                                    <strong className="title">
                                        {video.title}
                                    </strong>
                                </Col>
                                <Col
                                    span={24}
                                    style={{ height: 100, overflow: 'hidden' }}
                                >
                                    {video.briefIntro}
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Col>
    </Row>
);

export default VideoCard;
