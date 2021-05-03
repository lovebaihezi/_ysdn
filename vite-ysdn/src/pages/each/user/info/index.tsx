import { Button, Card, Col, Image, Row, Statistic, Tabs } from 'antd';
import Avatar from 'antd/lib/avatar/avatar';
import Meta from 'antd/lib/card/Meta';
import React, { FC, useEffect } from 'react';
import {
    Route,
    Switch,
    useHistory,
    useParams,
    useRouteMatch,
} from 'react-router-dom';
import { baseurl, ImageFallback, useUserDetail } from '../../../../auth';
import Ajax, { Component } from '../../../../component/AjaxResponse';
import EventSourceMessage, {
    ESProp,
} from '../../../../component/EventSourceMessage';
import TagSwitch, { useTag } from '../../../../component/TagSwitch';
import { AjaxJson } from '../../../../interface';
import { useFetchProps } from '../../../../tools/hook/useFetch';
import PagedArticles from '../../../Main/Article/pagedArticles';
import PagedVideos from '../../../Main/Video/pagedVideo';

const Article: Component<AjaxJson.article[]> = PagedArticles;

const Video: Component<AjaxJson.video[]> = ({ Response }) => (
    <PagedVideos Response={Response} />
);

const Comment: Component<AjaxJson.comment[]> = ({ Response }) => {
    return <></>;
};

const Product: FC = () => {
    const { tag } = useParams<{ tag: string }>();
    const [user] = useUserDetail();
    const filter = ['article', 'video', 'comment'];
    const Component = [Article, Video, Comment];
    if (!user) {
        return null;
    }
    const Request: useFetchProps = {
        url: baseurl + `/user/${user._id}/userProduct/${tag}/`,
    };
    //TODO type not complete, or change another way(Map?);
    return Ajax<any>({
        Request: Request,
        Component: Component[filter.indexOf(tag)],
    });
};

const config: name[] = [
    'articles',
    'videos',
    'comments',
    'questions',
    'answers',
    'activities',
];

const Follow: Component<{ amount: number }> = ({ Response }) => {
    return <Statistic title="follow" value={Response.amount} />;
};

const Follower: Component<{ amount: number }> = ({ Response }) => {
    return <Statistic title="follower" value={Response.amount} />;
};

const UserAllInfo: FC = () => {
    const [user] = useUserDetail();
    if (!user) {
        return null;
    }
    return (
        <Card style={{ width: '100%' }}>
            <Row>
                <Col span={12}>
                    <Card>
                        <Ajax
                            Request={{
                                url:
                                    baseurl +
                                    `/user/userInfo/${user.username}/follower`,
                            }}
                            Component={Follower}
                        />
                    </Card>
                </Col>
                <Col span={12}>
                    <Card>
                        <Ajax
                            Request={{
                                url:
                                    baseurl +
                                    `/user/userInfo/${user.username}/follow`,
                            }}
                            Component={Follow}
                        />
                    </Card>
                </Col>
            </Row>
        </Card>
    );
};

type name =
    | 'articles'
    | 'videos'
    | 'comments'
    | 'questions'
    | 'answers'
    | 'activities';

const Components = new Map<name, Component<any>>();
Components.set('articles', Article);
Components.set('videos', Video);
Components.set('comments', Comment);

const Each: FC<{
    name: name;
}> = ({ name }) => {
    const [user] = useUserDetail();
    if (!user) {
        return null;
    }
    if (Components.has(name)) {
        const X = Components.get(name);
        if (!X) {
            return null;
        }
        return (
            <Ajax
                Request={{
                    url: baseurl + `/user/${user.username}/userProduct/${name}`,
                }}
                Component={X}
            />
        );
    }
    return null;
};

const Info: Component<AjaxJson.userDetail> = ({ Response }) => {
    const [user] = useUserDetail();
    const History = useHistory();
    const { path } = useRouteMatch();
    return (
        <>
            <Row>
                <Col span={20} offset={2}>
                    <Row>
                        <Col span={8}>
                            <Card
                                style={{
                                    height: 162,
                                }}
                                // cover={
                                //     <Image
                                //         src={`${baseurl}/user/avatar/${Response.username}/${Response.avatarUrl}`}
                                //         fallback={ImageFallback}
                                //     />
                                // }
                                actions={
                                    Response._id === user?._id
                                        ? [
                                              <Button
                                                  onClick={(e) => {
                                                      History.push(
                                                          '/register/completeInformation',
                                                      );
                                                  }}
                                                  type="link"
                                              >
                                                  completeInformation
                                              </Button>,
                                              <Button onClick={(e) => {}}>
                                                  log out
                                              </Button>,
                                          ]
                                        : undefined
                                }
                            >
                                <Meta
                                    avatar={
                                        <Avatar
                                            src={`${baseurl}/user/avatar/${Response.username}/${Response.avatarUrl}`}
                                        />
                                    }
                                    title={Response.nickname}
                                />
                            </Card>
                        </Col>
                        <Col span={16}>
                            <UserAllInfo />
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row>
                <Col span={20} offset={2}>
                    <Tabs defaultActiveKey="1">
                        {config.map((name, key) => (
                            <Tabs.TabPane key={name} tab={name}>
                                <Each name={name} />
                            </Tabs.TabPane>
                        ))}
                    </Tabs>
                </Col>
            </Row>
        </>
    );
};

export default Info;
