import { Card, Col, Row, Image } from 'antd';
import React from 'react';
import { useParams } from 'react-router';
import { FetchFC, renderFetchResult } from '../../../../FC/FetchFC';
import { AjaxJson } from '../../../../interface';

const allArticle: renderFetchResult<AjaxJson.article[]> = ({ fetchResult }) => {
    return (
        <Row>
            {fetchResult.map((article) => (
                <Col span={20} offset={2} key={article.id}>
                    <Row>
                        {article.coverImgUrl ? (
                            <Col span={8}>
                                <img width="100%" src={article.coverImgUrl} />
                            </Col>
                        ) : null}
                        <Col span={16}>
                            <Card
                                bordered={false}
                                key={article?.title}
                                bodyStyle={{ padding: 6 }}
                            >
                                <Card.Meta
                                    style={{ height: 80 }}
                                    title={article.title}
                                    description={
                                        article.authors[0].Account.nickname
                                    }
                                />
                            </Card>
                        </Col>
                    </Row>
                </Col>
            ))}
        </Row>
    );
};

export default function UserArticles() {
    const { username } = useParams<{ username: string }>();
    return (
        <Row>
            <Col span={24}>
                {FetchFC<AjaxJson.article[]>([
                    {
                        url: `/${username}/articles`,
                        option: { method: 'POST' },
                    },
                    allArticle,
                ])}
            </Col>
        </Row>
    );
}
