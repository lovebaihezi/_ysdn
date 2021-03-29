import React from 'react';
import { Card, Col, Divider, Row, Image, Avatar } from 'antd';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { baseurl } from '../../../../auth';
import { AjaxJson } from '../../../../interface';
import { CSSProperties } from 'react';
import { FetchFC, renderFetchResult } from '../../../../FC/FetchFC';
import CardAction from '../../../../FC/Recommend';
import UserLink from '../../../../FC/userLink';

const imageUrl = 'picture/data-analyze.png';

const RankCardStyle: CSSProperties = {
    height: 150,
    overflow: 'hidden',
};

const QACard: renderFetchResult<AjaxJson.QA[]> = ({ fetchResult }) => (
    <>
        {fetchResult.map((v) => (
            <Card
                key={v.id}
                hoverable={true}
                style={{ margin: '10px 0' }}
                bordered={false}
                bodyStyle={{ padding: 6 }}
                onClick={() => {
                    location.href = `/QA/${v.id}`;
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
                            actions={[CardAction<AjaxJson.QA>(v)]}
                            bodyStyle={{ padding: 6 }}
                        >
                            <Card.Meta
                                style={{ height: 100 }}
                                avatar={<UserLink v={v.authors[0]} />}
                                title={
                                    <code>
                                        {v.authors[0].Account.nickname}{' '}
                                        {v.createTime.toLocaleString()}
                                    </code>
                                }
                                description={<code>{v?.question?.title}</code>}
                            />
                        </Card>
                    </Col>
                </Row>
            </Card>
        ))}
    </>
);

const RankCard: renderFetchResult<AjaxJson.QA[]> = ({ fetchResult }) => (
    <>
        {fetchResult.map((v) => (
            <Card
                key={v.id}
                onClick={() => {
                    location.href = `/QA/${v.id}`;
                }}
                hoverable={true}
                style={{ margin: '10px 0' }}
                bordered={false}
                bodyStyle={{ padding: 6 }}
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
                            actions={[CardAction<AjaxJson.QA>(v)]}
                            bodyStyle={{ padding: 6 }}
                        >
                            <Card.Meta
                                style={{ height: 100 }}
                                avatar={<UserLink v={v.authors[0]} />}
                                title={
                                    <code>
                                        {v.question.author.Account.nickname}{' '}
                                        {v.createTime.toLocaleString()}
                                    </code>
                                }
                                description={
                                    <code>{v.question.title.slice(1, 20)}</code>
                                }
                            />
                        </Card>
                    </Col>
                </Row>
            </Card>
        ))}
    </>
);

const QAsGrid: FC = () => {
    return (
        <Row>
            <Col
                span={20}
                offset={2}
                md={{ span: 22, offset: 1 }}
                style={{ padding: 45 }}
            >
                <Divider orientation="left">
                    <h2>{'QA'}</h2>
                </Divider>
                <Row>
                    <Col xxl={16} xl={12} lg={24} style={{ padding: 1 }}>
                        {FetchFC([
                            {
                                url: baseurl + '/QA/recommend',
                                option: { method: 'post' },
                            },
                            QACard,
                        ])}
                    </Col>
                    <Col xxl={8} xl={12} lg={24} style={{ padding: 1 }}>
                        {FetchFC([
                            {
                                url: baseurl + '/QA/rank',
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

export default QAsGrid;
