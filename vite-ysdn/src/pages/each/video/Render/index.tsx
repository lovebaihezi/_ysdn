import { Row, Col, Button, Card, Divider, Empty, Input, Comment } from 'antd';
import React, { FC, useState } from 'react';
import { baseurl, useUserDetail } from '../../../../auth';
import Ajax, { Component } from '../../../../component/AjaxResponse';
import UserLink from '../../../../component/UserLink';
import { AjaxJson } from '../../../../interface';
import { useFetchJson } from '../../../../tools/hook/useFetch';

const AddComment: FC<{ id: string }> = ({ id }) => {
    const [user] = useUserDetail();
    const [comment, setComment] = useState('');
    const [[response, l, error], f, c] = useFetchJson<{
        message: string;
        type: 'info' | 'error';
    }>({
        url: baseurl + `/video/update/${id}/comment`,
        option: {
            method: 'POST',
            body: JSON.stringify({
                content: comment,
                author: {
                    username: user?.username,
                    nickname: user?.nickname,
                    avatarUrl: user?.avatarUrl,
                },
            }),
            headers: new Headers({ 'Content-Type': 'application/json' }),
        },
    });
    return (
        <Row>
            <Col span={16}>
                <Row>
                    <Col span={16} offset={8}>
                        <Divider orientation="left">
                            "write down your ideas!"
                        </Divider>
                    </Col>
                </Row>
                <Row>
                    <Col span={16} offset={8}>
                        <Input.TextArea
                            disabled={user === null}
                            showCount
                            maxLength={200}
                            onChange={(e) => {
                                setComment(e.currentTarget.value);
                            }}
                        />
                        <Button
                            disabled={user === null && comment !== ''}
                            onClick={() => {
                                f()
                                    .then(() => location.reload())
                                    .catch(c);
                            }}
                            type="primary"
                        >
                            comment
                        </Button>
                    </Col>
                </Row>
            </Col>
        </Row>
    );
};

const Comments: Component<AjaxJson.comment[]> = ({ Response }) => {
    const [user] = useUserDetail();
    if (Response.length !== 0) {
        return (
            <>
                {Response.map((comment) => (
                    <Card key={comment.author.username}>
                        <Comment
                            datetime={comment.answerTime}
                            content={comment.content}
                            author={<UserLink user={comment.author} />}
                        />
                    </Card>
                ))}
            </>
        );
    } else {
        return (
            <Card>
                <Empty style={{ width: '100%' }} />
            </Card>
        );
    }
};

const GetComment: FC<{ id: string }> = ({ id }) => {
    return (
        <Row id="#comment">
            <Col span={16}>
                <Row>
                    <Col span={16} offset={8}>
                        <Ajax
                            Request={{
                                url: baseurl + `/video/${id}/comment`,
                            }}
                            Component={Comments}
                        />
                    </Col>
                </Row>
            </Col>
        </Row>
    );
};

const VideoRender: Component<AjaxJson.video> = ({ Response }) => {
    return (
        <>
            <Row>
                <Col span={20} offset={2}>
                    <video width="100%" controls>
                        <source
                            src={
                                baseurl +
                                `/video/video/${Response.author.username}/${Response.videoSrc[0]}`
                            }
                        />
                    </video>
                </Col>
            </Row>
        </>
    );
};

export default VideoRender;
