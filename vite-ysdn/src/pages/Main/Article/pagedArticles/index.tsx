import { Row, Col, Card, Divider, Button, Tag } from 'antd';
import React, { FC, useEffect, useMemo, useState } from 'react';

import {
    EyeOutlined,
    LikeOutlined,
    CommentOutlined,
    StarOutlined,
} from '@ant-design/icons';
import Avatar from 'antd/lib/avatar/avatar';
import { Component } from '../../../../component/AjaxResponse';
import { AjaxJson } from '../../../../interface';

import Action from '../../../../component/Action';

const PagedArticles: Component<AjaxJson.article[]> = ({ Response }) =>
    useMemo(
        () => (
            <>
                <Row>
                    {Response.map((article) => (
                        <Col span={24} key={article.id}>
                            <Card
                                bordered={false}
                                title={article.title}
                                actions={[]}
                                headStyle={{ padding: 0, border: 0 }}
                                style={{ cursor: 'pointer' }}
                            >
                                <Card.Meta
                                    title={article.authors[0].Account.nickname}
                                    avatar={
                                        <Avatar
                                            src={article.authors[0].avatarUrl}
                                        />
                                    }
                                    description={article.content}
                                />
                            </Card>
                            <Action tags={article.tags.map((c) => c.name)}>
                                <Row style={{ width: '100%' }} justify="end">
                                    <Col span={4}>
                                        <EyeOutlined /> {article.read}
                                    </Col>
                                    <Col span={4}>
                                        <LikeOutlined /> {article.approval}
                                    </Col>
                                    <Col span={4}>
                                        <CommentOutlined />
                                        {article.commentsAmount}
                                    </Col>
                                    <Col span={4}>
                                        <StarOutlined />
                                    </Col>
                                </Row>
                            </Action>
                            <Divider />
                        </Col>
                    ))}
                </Row>
            </>
        ),
        [Response],
    );

export default PagedArticles;
