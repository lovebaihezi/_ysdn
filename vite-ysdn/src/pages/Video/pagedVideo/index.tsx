import { Row, Col, Card, Divider, Button, Tag } from 'antd';
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

const Actions: FC<{ video: AjaxJson.video }> = ({ video }) => (
    <Action tags={video.tags.map((c) => c.name)}>
        <Row className="actionContain" justify="end">
            <Col span={4}>
                <EyeOutlined /> {video.read}
            </Col>
            <Col span={4}>
                <LikeOutlined /> {video.approval}
            </Col>
            <Col span={4}>
                <CommentOutlined /> {video.commentsAmount}
            </Col>
            <Col span={4}>
                <StarOutlined />
            </Col>
        </Row>
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
                                actions={[]}
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
                                <Action>
                                    <Col flex="auto">
                                        <Row
                                            className="actionContain"
                                            justify="end"
                                        >
                                            <div>
                                                <EyeOutlined />
                                                {video.read}
                                            </div>
                                            <div>
                                                <LikeOutlined />
                                                {video.approval}
                                            </div>
                                            <div>
                                                <CommentOutlined />
                                                {video.commentsAmount}
                                            </div>
                                            <div>
                                                <StarOutlined />
                                            </div>
                                        </Row>
                                    </Col>
                                </Action>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </>
        ),
        [Response],
    );

export default PagedVideos;
