import { Button, Card, Col, Image, Row } from 'antd';
import Avatar from 'antd/lib/avatar/avatar';
import Meta from 'antd/lib/card/Meta';
import React, { FC, useEffect } from 'react';
import { baseurl, ImageFallback, useUserDetail } from '../../../../auth';
import Ajax, { Component } from '../../../../component/AjaxResponse';
import TagSwitch, { useTag } from '../../../../component/TagSwitch';
import { AjaxJson } from '../../../../interface';
import { useFetchProps } from '../../../../tools/hook/useFetch';

const Article: Component<AjaxJson.article[]> = ({ Response }) => {
    useEffect(() => {
        console.log(Response);
    });
    return <></>;
};

const Video: Component<AjaxJson.video[]> = ({ Response }) => {
    return <></>;
};

const Comment: Component<AjaxJson.comment[]> = ({ Response }) => {
    return <></>;
};

const Product: FC = () => {
    const tag = useTag();
    const [user] = useUserDetail();
    const filter = ['article', 'video', 'comment'];
    const Component = [Article, Video, Comment];
    if (!filter.includes(tag) || !user) {
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

const Info: Component<AjaxJson.userDetail> = ({ Response }) => {
    const [user] = useUserDetail();
    return (
        <>
            <Row>
                <Col span={24}>
                    <Row>
                        <Col span={8} offset={8}>
                            <Card
                                cover={
                                    <Image
                                        src={`${baseurl}/user/avatar/${Response.username}/${Response.avatarUrl}`}
                                        fallback={ImageFallback}
                                    />
                                }
                                actions={
                                    Response._id === user?._id
                                        ? [
                                              <Button
                                                  onClick={(e) => {}}
                                              ></Button>,
                                              <Button></Button>,
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
                    </Row>
                </Col>
            </Row>
            <Row>
                <Col span={20} offset={2}>
                    <TagSwitch tags={['article', 'video', 'comment']}>
                        <Product />
                    </TagSwitch>
                </Col>
            </Row>
        </>
    );
};

export default Info;
