import React, { useEffect } from 'react';
import { Card, Col, Divider, Row, Image } from 'antd';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { baseurl } from '../../../../auth';
import { AjaxJson } from '../../../../interface';
import { CSSProperties } from 'react';
import { FetchFC, renderFetchResult } from '../../../../FC/FetchFC';
import CardAction from '../../../../FC/Recommend';
import UserLink from '../../../../FC/userLink';
import Avatar from 'antd/lib/avatar/avatar';

const imageUrl = 'picture/data-analyze.png';

const RankCardStyle: CSSProperties = {
    height: 150,
    overflow: 'hidden',
};

const grid = {
    xs: {},
    sm: {},
    md: {},
    lg: {},
};

const RankCard: renderFetchResult<AjaxJson.article[]> = ({ fetchResult }) => (
    <>
        {fetchResult.map((v) => (
            <Card
                key={v.id}
                hoverable={true}
                style={{ margin: '10px 0' }}
                bordered={false}
                bodyStyle={{ padding: 6 }}
                onClick={() => {
                    location.href = `/article/${v.id}`;
                }}
            >
                <Row>
                    {imageUrl ? (
                        <Col span={8} style={RankCardStyle}>
                            <img width="100%" src={v?.coverImgUrl} />
                        </Col>
                    ) : null}
                    <Col span={16}>
                        <Card
                            style={RankCardStyle}
                            bordered={false}
                            actions={[CardAction<AjaxJson.article>(v)]}
                            key={v?.title}
                            bodyStyle={{ padding: 6 }}
                        >
                            <Card.Meta
                                style={{ height: 80 }}
                                avatar={<UserLink v={v.authors[0]} />}
                                title={v.title}
                                description={v.authors[0].Account.nickname}
                            />
                        </Card>
                    </Col>
                </Row>
            </Card>
        ))}
    </>
);

const ArticleCard: renderFetchResult<AjaxJson.article[]> = ({
    fetchResult,
}) => {
    return (
        <>
            {fetchResult.map((v) => (
                <Card
                    hoverable={true}
                    key={v.id}
                    style={{ margin: '10px 0' }}
                    bordered={false}
                    bodyStyle={{ padding: 6 }}
                    onClick={() => {
                        location.href = `/article/${v.id}`;
                    }}
                >
                    <Row wrap={false}>
                        {imageUrl ? (
                            <Col span={8} style={RankCardStyle}>
                                <img width="100%" src={v?.coverImgUrl} />
                            </Col>
                        ) : null}
                        <Col span={16}>
                            <Card
                                style={RankCardStyle}
                                bordered={false}
                                actions={[CardAction<AjaxJson.article>(v)]}
                                bodyStyle={{ padding: 6 }}
                            >
                                <Card.Meta
                                    style={{ height: 100 }}
                                    avatar={<UserLink v={v.authors[0]} />}
                                    title={
                                        <code>
                                            {v.authors[0].Account.nickname}
                                            {v.createTime.toLocaleString()}
                                        </code>
                                    }
                                    description={
                                        <code>{v.content.slice(1, 20)}</code>
                                    }
                                />
                            </Card>
                        </Col>
                    </Row>
                </Card>
            ))}
        </>
    );
};

const ArticlesGrid: FC = () => {
    return (
        <Row>
            <Col
                span={20}
                offset={2}
                md={{ span: 22, offset: 1 }}
                xs={24}
                style={{ padding: 45 }}
            >
                <Divider orientation="left">
                    <h2>{'Articles'}</h2>
                </Divider>
                <Row>
                    <Col xxl={16} xl={12} lg={24} style={{ padding: 1 }}>
                        <>
                            {FetchFC([
                                {
                                    url: baseurl + '/articles/recommend',
                                    option: { method: 'post' },
                                },
                                ArticleCard,
                            ])}
                        </>
                    </Col>
                    <Col xxl={8} xl={12} lg={24} style={{ padding: 1 }}>
                        {FetchFC([
                            {
                                url: baseurl + '/articles/rank',
                                option: { method: 'post' },
                            },
                            RankCard,
                        ])}
                    </Col>
                </Row>
            </Col>
        </Row>
    );
};

export default ArticlesGrid;
