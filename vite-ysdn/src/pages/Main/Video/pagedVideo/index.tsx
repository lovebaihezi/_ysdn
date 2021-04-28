import { Row, Col, Card, Button, Tag } from 'antd';
import React, { FC, useEffect, useMemo, useState } from 'react';

import {
    EyeOutlined,
    LikeOutlined,
    CommentOutlined,
    StarOutlined,
} from '@ant-design/icons';
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
import { useUserDetail } from '../../../../auth';
// const Actions: FC<{ video: AjaxJson.video }> = ({ video }) => (
//     <Action>
//         <Col flex="auto">
//             <Row className="actionContain" justify="end">
//                 <Col className="action">
//                     <EyeOutlined />
//                     {video.read}
//                 </Col>
//                 <Col className="action">
//                     <LikeOutlined />
//                     {video.approval}
//                 </Col>
//                 <Col className="action">
//                     <CommentOutlined />
//                     {video.commentsAmount}
//                 </Col>
//                 <Col className="action">
//                     <StarOutlined />
//                 </Col>
//             </Row>
//         </Col>
//     </Action>
// );

const PagedVideos: Component<AjaxJson.video[]> = ({ Response }) => {
    const [user] = useUserDetail();
    return useMemo(
        () => (
            <>
                <Row>
                    {Response.map((video) => (
                        <Col span={8} style={{ padding: 36 }} key={video._id}>
                            <Card
                                actions={[
                                    <LikeButton
                                        type="video"
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
                                        type={'article'}
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
                                cover={
                                    <img
                                        height="200px"
                                        src={video.coverImgUrl}
                                    />
                                }
                                headStyle={{ border: 0 }}
                                bodyStyle={{ border: 0 }}
                                style={{ cursor: 'pointer', marginBottom: 24 }}
                            >
                                <Card.Meta
                                    title={video.title}
                                    avatar={
                                        <>
                                            <Avatar
                                                src={video?.author?.avatarUrl}
                                            />
                                            {video?.author?.nickname}
                                        </>
                                    }
                                    description={video.briefIntro}
                                />
                            </Card>
                        </Col>
                    ))}
                </Row>
            </>
        ),
        [Response],
    );
};

export default PagedVideos;
