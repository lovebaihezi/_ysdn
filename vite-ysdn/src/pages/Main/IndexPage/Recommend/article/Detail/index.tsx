import { Card, Col, Row } from 'antd';
import React, { useEffect } from 'react';
import { Component } from '../../../../../../component/AjaxResponse';
import { AjaxJson } from '../../../../../../interface';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import UserLink from '../../../../../../component/UserLink';
import {
    LikeButton,
    MarkButton,
    CommentButton,
    ReadButton,
} from '../../../../../../component/ActionButton';
import Tags from '../../../../../../component/ActionTags';
import { useUserDetail } from '../../../../../../auth';

const ArticleCard: FC<{ article: AjaxJson.IndexDetailArticle }> = ({
    article,
}) => {
    const [user] = useUserDetail();
    return (
        <Col span={24} style={{ margin: '2px 0' }} className="Detail">
            <Link to={`/article/${article._id}`}>
                <Row>
                    <Col span={8}>
                        <img
                            width="100%"
                            src={article.coverImgUrl}
                            alt={article.title}
                        />
                    </Col>
                    <Col span={15} offset={1}>
                        <Card
                            bordered={false}
                            bodyStyle={{ padding: 0 }}
                            headStyle={{ padding: 0 }}
                            actions={[
                                <Tags tags={article.tags.map((v) => v.name)} />,
                                <LikeButton
                                    type={'article'}
                                    amount={
                                        article.approval - article.disapproval
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
                                            ? user.marks.includes(article._id)
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
                        >
                            <h2>{article.title}</h2>
                            <Row>
                                <Col span={8}>
                                    <UserLink user={article.author} />
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                </Row>
            </Link>
        </Col>
    );
};

const DetailArticle: Component<AjaxJson.IndexDetailArticle[]> = ({
    Response,
}) => {
    return (
        <Row>
            <Col span={22} offset={1}>
                <Card
                    bordered={false}
                    bodyStyle={{ padding: '2px 16px' }}
                    title="Article"
                    extra={
                        <Link to="/article">
                            <strong
                                style={{ cursor: 'pointer' }}
                            >{`more >`}</strong>
                        </Link>
                    }
                >
                    <Row>
                        {Response.map((article) => (
                            <ArticleCard key={article._id} article={article} />
                        ))}
                    </Row>
                </Card>
            </Col>
        </Row>
    );
};

export default DetailArticle;
