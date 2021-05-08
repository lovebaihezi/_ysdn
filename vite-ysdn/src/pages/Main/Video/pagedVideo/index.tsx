import { Row, Col, Card, Button, Tag, Empty } from 'antd';
import React, { FC, useEffect, useMemo, useState } from 'react';

import Avatar from 'antd/lib/avatar/avatar';
import { Component } from '../../../../component/AjaxResponse';
import { AjaxJson } from '../../../../interface';

import './paged.css';
import {
    LikeButton,
    MarkButton,
    CommentButton,
    ReadButton,
} from '../../../../component/ActionButton';
import { baseurl, useUserDetail } from '../../../../auth';
import Tags from '../../../../component/ActionTags';
import UserLink from '../../../../component/UserLink';
import { Link } from 'react-router-dom';

const PagedVideos: Component<AjaxJson.video[]> = ({ Response }) => {
    const [user] = useUserDetail();
    if (Response.length === 0) {
        return (
            <Card>
                <Empty />
            </Card>
        );
    }
    return useMemo(
        () => (
            <>
                <Row>
                    {Response.map((video) => (
                        <Col span={8} style={{ padding: 36 }} key={video._id}>
                            <Link to={`/video/${video._id}`}>
                                <Card
                                    actions={[
                                        <LikeButton
                                            type="video"
                                            amount={
                                                video.approval -
                                                video.disapproval
                                            }
                                            initial={
                                                user
                                                    ? user.like.videos.includes(
                                                          video._id,
                                                      )
                                                    : false
                                            }
                                            id={video._id}
                                        />,
                                        <MarkButton
                                            amount={video.markAmount}
                                            type={'article'}
                                            initial={
                                                user
                                                    ? user.marks.includes(
                                                          video._id,
                                                      )
                                                    : false
                                            }
                                            id={video._id}
                                        />,
                                        <CommentButton
                                            amount={video.commentsAmount}
                                            link={`/video/${video._id}/#comment`}
                                        />,
                                        <ReadButton
                                            amount={video.read}
                                            link={`/video/${video._id}`}
                                        />,
                                    ]}
                                    cover={<img src={video.coverImgUrl} />}
                                    headStyle={{ border: 0 }}
                                    bodyStyle={{ border: 0 }}
                                    style={{
                                        cursor: 'pointer',
                                        marginBottom: 24,
                                    }}
                                >
                                    <Card.Meta
                                        title={video.title}
                                        avatar={
                                            <UserLink user={video.author} />
                                        }
                                        description={video.briefIntro}
                                    />
                                    <Row>
                                        <Col span={24}>
                                            <Tags tags={video.tags} />,
                                        </Col>
                                    </Row>
                                </Card>
                            </Link>
                        </Col>
                    ))}
                </Row>
            </>
        ),
        [Response],
    );
};

export default PagedVideos;
