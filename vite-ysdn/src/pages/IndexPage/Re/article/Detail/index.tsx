import { Card, Col, Divider, Row } from 'antd';
import Avatar from 'antd/lib/avatar/avatar';
import React from 'react';
import { Component } from '../../../../../component/AjaxResponse';
import { AjaxJson } from '../../../../../interface';
import {
    EyeOutlined,
    LikeOutlined,
    CommentOutlined,
    StarOutlined,
} from '@ant-design/icons';

import { FC } from 'react';

const ArticleCard: FC<{ article: AjaxJson.IndexDetailArticle }> = ({
    article,
}) => (
    <Col
        span={22}
        onClick={(e) => {
            location.href = `/${article.authors[0].Account.auth}/article/${article.id}`;
        }}
        offset={1}
        style={{ margin: '2px 0' }}
        className="Detail"
    >
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
                        <Row
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                            }}
                            justify="end"
                        >
                            <Col span={12}>
                                <Row className="actionContain" justify="end">
                                    <Col className="action">
                                        <EyeOutlined />
                                        {article.read}
                                    </Col>
                                    <Col className="action">
                                        <LikeOutlined />
                                        {article.approval}
                                    </Col>
                                    <Col className="action">
                                        <CommentOutlined />
                                        {article.commentsAmount}
                                    </Col>
                                    <Col className="action">
                                        <StarOutlined />
                                    </Col>
                                </Row>
                            </Col>
                        </Row>,
                    ]}
                >
                    <Row className="actionContain">
                        <Col span={24} className="action title">
                            {article.title}
                        </Col>
                        <Col
                            className="action"
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                            }}
                        >
                            <Avatar
                                className="avatar"
                                src={article.authors[0].avatarUrl}
                            />
                            {article.authors[0].Account.nickname}
                        </Col>
                    </Row>
                </Card>
            </Col>
        </Row>
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
                        <strong
                            style={{ cursor: 'pointer' }}
                            onClick={(e) => {
                                location.href = '/article';
                            }}
                        >{`more >`}</strong>
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
