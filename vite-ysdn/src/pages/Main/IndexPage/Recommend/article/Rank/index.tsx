import { Card, Col, Row } from 'antd';
import React from 'react';
import { Component } from '../../../../../../component/AjaxResponse';
import { AjaxJson } from '../../../../../../interface';
import { Link } from 'react-router-dom';
import {
    LikeButton,
    MarkButton,
    CommentButton,
    ReadButton,
} from '../../../../../../component/ActionButton';
import { useUserDetail } from '../../../../../../auth';
import UserLink from '../../../../../../component/UserLink';

const ArticleRank: Component<AjaxJson.IndexRankArticle[]> = ({ Response }) => {
    const [user] = useUserDetail();
    return (
        <Card title="Rank" bodyStyle={{ padding: '1px 16px' }}>
            <Row>
                {Response.map((article) => (
                    <Col key={article._id} span={24}>
                        <Link to={`/article/${article._id}`}>
                            <Row>
                                <Col span={24} style={{ cursor: 'pointer' }}>
                                    <Card
                                        bordered={false}
                                        bodyStyle={{ padding: 0 }}
                                        title={article.title}
                                        headStyle={{ padding: 0 }}
                                    >
                                        <Row>
                                            <Col>
                                                <Card.Meta
                                                    avatar={
                                                        <UserLink
                                                            user={
                                                                article.author
                                                            }
                                                        />
                                                    }
                                                />
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
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
                                                />
                                            </Col>
                                            <Col>
                                                <ReadButton
                                                    amount={article.read}
                                                    link={`/article/${article._id}`}
                                                />
                                            </Col>
                                        </Row>
                                    </Card>
                                </Col>
                            </Row>
                        </Link>
                    </Col>
                ))}
            </Row>
        </Card>
    );
};

export default ArticleRank;
