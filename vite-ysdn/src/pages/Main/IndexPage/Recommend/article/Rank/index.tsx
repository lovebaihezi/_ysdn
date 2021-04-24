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
} from '../../../../../../component/actionButton';

const ArticleRank: Component<AjaxJson.IndexRankArticle[]> = ({ Response }) => {
    return (
        <Card title="Rank" bodyStyle={{ padding: '1px 16px' }}>
            <Row>
                {Response.slice(0, 10).map((article) => (
                    <Col key={article.id} span={24}>
                        <Link to={`/article/${article.id}`}>
                            <Row>
                                <Col span={6}></Col>
                                <Col span={18} style={{ cursor: 'pointer' }}>
                                    <Card
                                        bordered={false}
                                        bodyStyle={{ padding: 0 }}
                                        title={article.title}
                                        headStyle={{ padding: 0 }}
                                        actions={[
                                            <LikeButton
                                                amount={12}
                                                initial={true}
                                            />,
                                            <MarkButton
                                                amount={12}
                                                initial={true}
                                            />,
                                            <CommentButton
                                                amount={12}
                                                link={''}
                                            />,
                                            <ReadButton
                                                amount={12}
                                                link={''}
                                            />,
                                        ]}
                                    />
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
