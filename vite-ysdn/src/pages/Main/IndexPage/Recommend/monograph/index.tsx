import { Card, Col, Divider, Empty, Row } from 'antd';
import React from 'react';
import { FC } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { baseurl } from '../../../../../auth';
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
                title={article.title}
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
                <Row>
                    <Col span={24}>
                        <Card.Meta
                            description={article.content.slice(0, 100)}
                            avatar={<UserLink user={article.author} />}
                        />
                    </Col>
                </Row>
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
    const H = useHistory();
    const { article, video } = Response;
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

const Request: useFetchProps = {
    url: baseurl + '/monographic',
};

export default function IndexMonograph() {
    return <Ajax Request={Request} Component={MonographCard} />;
}
