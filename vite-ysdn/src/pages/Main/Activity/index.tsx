import { Avatar, Col, Empty, Row } from 'antd';
import React, { useMemo } from 'react';
import { FC } from 'react';
import { baseurl, useUserDetail } from '../../../auth';
import Ajax, { Component } from '../../../component/AjaxResponse';
import TagSwitch, { InnerTag, useTag } from '../../../component/TagSwitch';
import UserLink from '../../../component/UserLink';
import { AjaxJson } from '../../../interface';
import { useFetchProps } from '../../../tools/hook/useFetch';
import PagedArticles from '../Article/pagedArticles';

const Article: Component<AjaxJson.article[]> = ({ Response }) => {
    return Response.length === 0 ? (
        <Empty description={`你还未发表过文章`} />
    ) : (
        <Row>
            <Col span={22} offset={1}>
                <PagedArticles Response={Response} />
            </Col>
        </Row>
    );
};

const TagComponent: FC = () => {
    const username = useTag();
    return (
        <Ajax
            Request={{
                url: baseurl + `/user/${username}/userProduct/articles`,
            }}
            Component={Article}
        />
    );
};

const ActivityComponent: Component<AjaxJson.userInfo[]> = ({ Response }) => {
    return (
        <Row>
            <Col span={18} offset={3}>
                <TagSwitch
                    tags={Response.map(({ username }) => username)}
                    title={Response.map((v) => (
                        <div>
                            <Avatar
                                src={
                                    /^https?:/.test(v.avatarUrl)
                                        ? v.avatarUrl
                                        : baseurl +
                                          `/user/avatar/${v.username}/${v.avatarUrl}`
                                }
                            />
                            <span>{v.nickname}</span>
                        </div>
                    ))}
                >
                    <TagComponent />
                </TagSwitch>
            </Col>
        </Row>
    );
};

const Activity: FC = () => {
    const [user] = useUserDetail();
    if (user === null) {
        return <Empty description={'你还未登录哦'} />;
    }
    return (
        <Ajax
            Request={{ url: baseurl + `/user/find/${user.username}/follow` }}
            Component={ActivityComponent}
        />
    );
};

export default Activity;
