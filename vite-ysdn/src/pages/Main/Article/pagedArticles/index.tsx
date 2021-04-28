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
} from '../../../../component/ActionButton';
import Tags from '../../../../component/ActionTags';
import { useUserDetail } from '../../../../auth';

const PagedArticles: Component<AjaxJson.article[]> = ({ Response }) => {
    const [user] = useUserDetail();
    return useMemo(
        () => (
            <>
                <Row>
                    {Response.map((article) => (
                        <Col span={24} key={article._id}>
                            <Link to={`/article/${article._id}`}>
                                <Card
                                    bordered={false}
                                    title={article.title}
                                    actions={[
                                        <Tags
                                            tags={article.tags.map(
                                                (v) => v.name,
                                            )}
                                        />,
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
                                        title={article.author.nickname}
                                        avatar={
                                            <Avatar
                                                src={article.author.avatarUrl}
                                            />
                                        }
                                        description={article.content.slice(
                                            0,
                                            200,
                                        )}
                                    />
                                </Card>
                            </Link>
                        </Col>
                    ))}
                </Row>
            </>
        ),
        [Response],
    );
};

export default PagedArticles;
