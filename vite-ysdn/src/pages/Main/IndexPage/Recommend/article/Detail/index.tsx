import { Card, Col, Divider, Row } from 'antd';
import Avatar from 'antd/lib/avatar/avatar';
import React from 'react';
import { Component } from '../../../../../../component/AjaxResponse';
import { AjaxJson } from '../../../../../../interface';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import UserLink from '../../../../../../component/userLink';
import {
    LikeButton,
    MarkButton,
    CommentButton,
    ReadButton,
} from '../../../../../../component/actionButton';
import Tags from '../../../../../../component/Tags';

const ArticleCard: FC<{ article: AjaxJson.IndexDetailArticle }> = ({
    article,
}) => (
    <Col span={24} style={{ margin: '2px 0' }} className="Detail">
        <Link to={`/article/${article.id}`}>
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
                            <Tags tags={['test']} />,
                            <LikeButton amount={12} initial={true} />,
                            <MarkButton amount={12} initial={true} />,
                            <CommentButton amount={12} link={''} />,
                            <ReadButton amount={12} link={''} />,
                        ]}
                    >
                        <Row className="actionContain">
                            <Col span={24} className="action title">
                                {article.title}
                            </Col>
                            <Col className="action">
                                <UserLink user={article.authors[0]} />
                            </Col>
                        </Row>
                    </Card>
                </Col>
            </Row>
        </Link>
    </Col>
);

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
                            <ArticleCard key={article.id} article={article} />
                        ))}
                    </Row>
                </Card>
            </Col>
        </Row>
    );
};

export default DetailArticle;
