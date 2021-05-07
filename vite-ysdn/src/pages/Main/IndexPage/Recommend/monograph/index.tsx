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
                cover={<img src={article.coverImgUrl} />}
            >
                <Card.Meta avatar={<UserLink user={article.author} />}>
                    {article.content.slice(0, 100)}
                </Card.Meta>
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
            <Card title={video.title} cover={<img src={video.coverImgUrl} />}>
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
    article: AjaxJson.article | null;
    video: AjaxJson.video | null;
}> = ({ Response }) => {
    const H = useHistory();
    const { article, video } = Response;
    return (
        <Row>
            <Col span={20} offset={2} style={{ overflow: 'hidden' }}>
                <Divider />
                <Row>
                    <Col span={10}>
                        <ArticleCard article={Response.article} />
                    </Col>
                    <Col span={10} offset={4}>
                        <VideoCard video={Response.video} />
                    </Col>
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
