import { Card, Col, Divider, Row } from 'antd';
import Avatar from 'antd/lib/avatar/avatar';
import React from 'react';
import Ajax, { Comment } from '../../../../../component/AjaxResponse';
import { AjaxJson } from '../../../../../interface';
import { EyeOutlined, LikeOutlined } from '@ant-design/icons';

const ArticleRank: Comment<AjaxJson.IndexRankArticle[]> = ({ Response }) => {
    return (
        <Card title="Rank" bodyStyle={{ padding: '1px 16px' }}>
            <Row>
                {Response.slice(0,10).map((article, index) => (
                    <Col key={article.id} span={24}>
                        <Row>
                            <Col span={6}></Col>
                            <Col
                                span={18}
                                onClick={(e) => {
                                    location.href = `/${article.authors[0].Account.auth}/article/${article.id}`;
                                }}
                                style={{ cursor: 'pointer' }}
                            >
                                <Card
                                    bordered={false}
                                    bodyStyle={{ padding: 0 }}
                                    title={article.title}
                                    headStyle={{ padding: 0 }}
                                    actions={[
                                        <Row
                                            onClick={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                            }}
                                        >
                                            <Col
                                                span={4}
                                                onClick={(e) => {
                                                    location.href = `/user/${article.authors[0].Account.auth}`;
                                                }}
                                            >
                                                {
                                                    article.authors[0].Account
                                                        .nickname
                                                }
                                            </Col>
                                            <Col span={20}>
                                                <Row justify="end">
                                                    <Col span={4}>
                                                        <EyeOutlined />
                                                    </Col>
                                                    <Col span={4}>
                                                        {article.read}
                                                    </Col>
                                                    <Col span={4}>
                                                        <LikeOutlined />
                                                    </Col>
                                                    <Col span={4}>
                                                        {article.approval}
                                                    </Col>
                                                </Row>
                                            </Col>
                                        </Row>,
                                    ]}
                                />
                            </Col>
                        </Row>
                    </Col>
                ))}
            </Row>
        </Card>
    );
};

export default ArticleRank;
