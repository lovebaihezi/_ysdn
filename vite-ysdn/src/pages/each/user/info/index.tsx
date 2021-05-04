import { Button, Card, Col, message, Row, Statistic, Tabs } from 'antd';
import Avatar from 'antd/lib/avatar/avatar';
import Meta from 'antd/lib/card/Meta';
import React, { FC, ReactNode, useEffect } from 'react';
import { useHistory, useParams, useRouteMatch } from 'react-router-dom';
import { baseurl, ImageFallback, useUserDetail } from '../../../../auth';
import Ajax, { Component } from '../../../../component/AjaxResponse';
import { AjaxJson } from '../../../../interface';
import { useFetchProps } from '../../../../tools/hook/useFetch';
import PagedArticles from '../../../Main/Article/pagedArticles';
import PagedVideos from '../../../Main/Video/pagedVideo';

const Article: Component<AjaxJson.article[]> = PagedArticles;

const Video: Component<AjaxJson.video[]> = ({ Response }) => {
    return <PagedVideos Response={Response} />;
};

const Comment: Component<AjaxJson.comment[]> = ({ Response }) => {
    return <></>;
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

const LeftRight: FC<{ Component: [ReactNode, ReactNode] }> = ({
    Component: [Left, Right],
}) => {
    return (
        <Card style={{ width: '100%' }}>
            <Row>
                <Col span={12}>
                    <Card>{Left}</Card>
                </Col>
                <Col span={12}>
                    <Card>{Right}</Card>
                </Col>
            </Row>
        </Card>
    );
};

const UserAllInfo: FC<{ username: string }> = ({ username }) => {
    return (
        <>
            <LeftRight
                Component={[
                    <Ajax
                        Request={{
                            url:
                                baseurl + `/user/userInfo/${username}/follower`,
                        }}
                        Component={Follower}
                    />,
                    <Ajax
                        Request={{
                            url: baseurl + `/user/userInfo/${username}/follow`,
                        }}
                        Component={Follow}
                    />,
                ]}
            />
            <Card style={{ width: '100%' }}></Card>
        </>
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
    username: string;
}> = ({ name, username }) => {
    if (Components.has(name)) {
        const X = Components.get(name);
        if (!X) {
            return null;
        }
        return (
            <Ajax
                Request={{
                    url: baseurl + `/user/${username}/userProduct/${name}`,
                }}
                Component={X}
            />
        );
    }
    return null;
};
//
const Info: Component<AjaxJson.userDetail> = ({ Response }) => {
    const History = useHistory();
    useEffect(() => {
        if (!Response.username) {
            message.error('user not found!');
            History.goBack();
        }
    }, []);
    const { path } = useRouteMatch();
    const [user] = useUserDetail();
    return (
        <>
            <Row>
                <Col span={20} offset={2}>
                    <Row>
                        <Col span={8}>
                            <Card
                                style={{ height: '100%' }}
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
                            <UserAllInfo username={Response.username} />
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row>
                <Col span={20} offset={2}>
                    <Tabs defaultActiveKey="1">
                        {config.map((name, key) => (
                            <Tabs.TabPane key={name} tab={name}>
                                <Each
                                    name={name}
                                    username={Response.username}
                                />
                            </Tabs.TabPane>
                        ))}
                    </Tabs>
                </Col>
            </Row>
        </>
    );
};

export default Info;
