import { Card, Col, Divider, Row } from 'antd';
import React from 'react';
import { Component } from '../../../../../../component/AjaxResponse';
import { AjaxJson } from '../../../../../../interface';

import {
    StarOutlined,
    EyeOutlined,
    LikeOutlined,
    CommentOutlined,
} from '@ant-design/icons';
import Avatar from 'antd/lib/avatar/avatar';
import AvatarLink from '../../../../../../component/AvatarLink';
import UserLink from '../../../../../../component/UserLink';
import { useUserDetail } from '../../../../../../auth';
import {
    LikeButton,
    MarkButton,
    CommentButton,
    ReadButton,
} from '../../../../../../component/ActionButton';

const VideoCard: Component<AjaxJson.video[]> = ({ Response }) => {
    const [user] = useUserDetail();
    return (
        <Row>
            <Col span={24} style={{ overflow: 'hidden' }}>
                <Row wrap={false}>
                    {Response.map((video) => (
                        <Col span={8} key={video._id} style={{ padding: 10 }}>
                            <Card
                                className="monographCard"
                                cover={
                                    <img
                                        width="300px"
                                        height="250px"
                                        src={video.coverImgUrl}
                                    />
                                }
                                actions={[
                                    <LikeButton
                                        type={'article'}
                                        amount={
                                            video.approval - video.disapproval
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
                                        type={'video'}
                                        initial={
                                            user
                                                ? user.marks.includes(video._id)
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
                            >
                                <Row>
                                    <Col span={24}>
                                        <strong className="title">
                                            {video.title}
                                        </strong>
                                    </Col>
                                    <Col
                                        span={24}
                                        style={{
                                            height: 100,
                                            overflow: 'hidden',
                                        }}
                                    >
                                        {video.briefIntro}
                                    </Col>
                                </Row>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Col>
        </Row>
    );
};
export default VideoCard;
