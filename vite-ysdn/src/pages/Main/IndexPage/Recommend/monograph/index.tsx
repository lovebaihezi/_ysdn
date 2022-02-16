import { Card, Col, Divider, Empty, Row } from 'antd';
import React from 'react';
import { FC } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { baseurl, useUserDetail } from '../../../../../auth';
import Tags from '../../../../../component/ActionTags';
import Ajax, { Component } from '../../../../../component/AjaxResponse';
import UserLink from '../../../../../component/UserLink';
import { AjaxJson } from '../../../../../interface';
import { useFetchProps } from '../../../../../tools/hook/useFetch';

import './monograph.css';

const ArticleCard: FC<{ article: AjaxJson.article | null }> = ({ article }) => {
    if (article === null) {
        return (
            <Card>
                <Empty />
            </Card>
        );
    }
    return (
        <Link to={`/article/${article._id}`}>
            <Card
                title={<strong>{article.title}</strong>}
                cover={
                    <div
                        style={{
                            width: '100%',
                            height: 200,
                            backgroundImage: `url(${article.coverImgUrl})`,
                            backgroundPosition: 'center',
                            backgroundSize: 'cover',
                        }}
                    />
                }
            >
                <Row style={{ marginBottom: 10 }}>
                    <Col span={24}>
                        <Card.Meta
                            avatar={<UserLink user={article.author} />}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>{article.content.slice(0, 100)}</Col>
                </Row>
                <Divider />
                <Row>
                    <Col span={24}>
                        <Tags tags={article.tags}></Tags>
                    </Col>
                </Row>
            </Card>
        </Link>
    );
};

const VideoCard: FC<{ video: AjaxJson.video | null }> = ({ video }) => {
    if (video === null) {
        return (
            <Card>
                <Empty />
            </Card>
        );
    }
    return (
        <Link to={`/video/${video._id}`}>
            <Card
                title={video.title}
                cover={
                    <div
                        style={{ backgroundImage: `url(${video.coverImgUrl})` }}
                    />
                }
            >
                <Card.Meta
                    avatar={<UserLink user={video.author} />}
                    description={video.briefIntro.slice(0, 100)}
                >
                    {video.briefIntro.slice(0, 100)}
                </Card.Meta>
                <Row>
                    <Col span={24}>
                        <Tags tags={video.tags}></Tags>
                    </Col>
                </Row>
            </Card>
        </Link>
    );
};

const MonographCard: Component<{
    article: AjaxJson.article[] | null;
    video: AjaxJson.video[] | null;
}> = ({ Response }) => {
    return (
        <Row>
            <Col span={24} style={{ overflow: 'hidden' }}>
                <Divider />
                <Row>
                    {Response.article?.map((v) => (
                        <Col style={{ padding: '0 10px' }} key={v._id} span={8}>
                            <ArticleCard article={v} />
                        </Col>
                    ))}
                </Row>
            </Col>
        </Row>
    );
};

export default function IndexMonograph() {
    const [user] = useUserDetail();
    return (
        <Ajax
            Request={{
                url: baseurl + '/monographic',
            }}
            Component={MonographCard}
        />
    );
}
