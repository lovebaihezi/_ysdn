import { Row, Col, Card, Button, Tag } from 'antd';
import React, { FC, useEffect, useMemo, useState } from 'react';

import {
    EyeOutlined,
    LikeOutlined,
    CommentOutlined,
    StarOutlined,
} from '@ant-design/icons';
import Avatar from 'antd/lib/avatar/avatar';
import { Component } from '../../../component/AjaxResponse';
import { AjaxJson } from '../../../interface';

import Action from '../../../component/Action';

import './paged.css';

const Actions: FC<{ video: AjaxJson.video }> = ({ video }) => (
    <Action>
        <Col flex="auto">
            <Row className="actionContain" justify="end">
                <Col className="action">
                    <EyeOutlined />
                    {video.read}
                </Col>
                <Col className="action">
                    <LikeOutlined />
                    {video.approval}
                </Col>
                <Col className="action">
                    <CommentOutlined />
                    {video.commentsAmount}
                </Col>
                <Col className="action">
                    <StarOutlined />
                </Col>
            </Row>
        </Col>
    </Action>
);

const PagedVideos: Component<AjaxJson.video[]> = ({ Response }) =>
    useMemo(
        () => (
            <>
                <Row>
                    {Response.map((video) => (
                        <Col span={8} style={{ padding: 36 }} key={video.id}>
                            <Card
                                actions={[<Actions video={video} />]}
                                cover={
                                    <img
                                        height="200px"
                                        src={video.coverImgUrl}
                                    />
                                }
                                headStyle={{ border: 0 }}
                                bodyStyle={{ border: 0 }}
                                style={{ cursor: 'pointer', marginBottom: 24 }}
                            >
                                <Card.Meta
                                    title={video.title}
                                    avatar={
                                        <>
                                            <Avatar
                                                src={video.authors[0].avatarUrl}
                                            />
                                            {video.authors[0].Account.nickname}
                                        </>
                                    }
                                    description={video.briefIntro}
                                />
                            </Card>
                        </Col>
                    ))}
                </Row>
            </>
        ),
        [Response],
    );

export default PagedVideos;
