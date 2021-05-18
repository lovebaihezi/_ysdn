import { Row, Col, Card, Divider, Button, Tag, Empty } from 'antd';
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
} from '../../../../component/ActionButton';
import Tags from '../../../../component/ActionTags';
import { useUserDetail } from '../../../../auth';
import UserLink from '../../../../component/UserLink';

const PagedArticles: Component<AjaxJson.article[]> = ({ Response }) => {
    const [user] = useUserDetail();
    if (Response.length === 0) {
        return (
            <Row>
                <Col span={20} offset={2}>
                    <Empty />
                </Col>
            </Row>
        );
    }
    return (
        <>
            <Row>
                {Response.map((article) => (
                    <Col span={24} key={article._id}>
                        <Link to={`/article/${article._id}`}>
                            <Card
                                bordered={false}
                                title={<strong>{article.title}</strong>}
                                bodyStyle={{ padding: 0 }}
                                extra={
                                    <span>
                                        {article.createTime
                                            .toString()
                                            .replace('T', ' ')
                                            .replace('Z', '')
                                            .replace('.000', '')}
                                    </span>
                                }
                                actions={[
                                    <LikeButton
                                        type={'article'}
                                        amount={
                                            article.approval -
                                            article.disapproval
                                        }
                                        initial={
                                            user
                                                ? user.like.articles.includes(
                                                      article._id,
                                                  )
                                                : false
                                        }
                                        id={article._id}
                                    />,
                                    <MarkButton
                                        amount={article.markAmount}
                                        type={'article'}
                                        initial={
                                            user
                                                ? user.marks.includes(
                                                      article._id,
                                                  )
                                                : false
                                        }
                                        id={article._id}
                                    />,
                                    <CommentButton
                                        amount={article.commentsAmount}
                                        link={`/article/${article._id}/#comment`}
                                    />,
                                    <ReadButton
                                        amount={article.read}
                                        link={`/article/${article._id}`}
                                    />,
                                ]}
                                headStyle={{ padding: 0, border: 0 }}
                            >
                                <Card.Meta
                                    avatar={<UserLink user={article.author} />}
                                    description={article.content.slice(0, 100)}
                                    style={{ marginBottom: 10 }}
                                />
                                <Row style={{ padding: 5 }}>
                                    <Col span={24}>
                                        <Tags tags={article.tags} />
                                    </Col>
                                </Row>
                            </Card>
                        </Link>
                    </Col>
                ))}
            </Row>
        </>
    );
};

export default PagedArticles;
