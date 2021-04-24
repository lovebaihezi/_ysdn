import { Row, Col, Card, Divider, Button, Tag } from 'antd';
import React, { FC, useEffect, useMemo, useState } from 'react';
import Avatar from 'antd/lib/avatar/avatar';
import { Component } from '../../../../component/AjaxResponse';
import { AjaxJson } from '../../../../interface';

import { Link } from 'react-router-dom';
import {
    LikeButton,
    MarkButton,
    CommentButton,
    ReadButton,
} from '../../../../component/actionButton';
import Tags from '../../../../component/ActionTags';

const PagedArticles: Component<AjaxJson.article[]> = ({ Response }) =>
    useMemo(
        () => (
            <>
                <Row>
                    {Response.map((article) => (
                        <Col span={24} key={article.id}>
                            <Link to={`/article/${article.id}`}>
                                <Card
                                    bordered={false}
                                    title={article.title}
                                    actions={[
                                        <Tags tags={['test']} />,
                                        <LikeButton
                                            amount={12}
                                            initial={true}
                                        />,
                                        <MarkButton
                                            amount={12}
                                            initial={true}
                                        />,
                                        <CommentButton amount={12} link={''} />,
                                        <ReadButton amount={12} link={''} />,
                                    ]}
                                    headStyle={{ padding: 0, border: 0 }}
                                >
                                    <Card.Meta
                                        title={article.authors[0].toString()}
                                        avatar={
                                            <Avatar
                                                src={
                                                    article.authors[0].avatarUrl
                                                }
                                            />
                                        }
                                        description={article.content}
                                    />
                                </Card>
                            </Link>
                            <Divider />
                        </Col>
                    ))}
                </Row>
            </>
        ),
        [Response],
    );

export default PagedArticles;
