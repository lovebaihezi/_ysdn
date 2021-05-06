import {
    Affix,
    Button,
    Card,
    Col,
    Comment,
    Divider,
    Empty,
    Input,
    message,
    Row,
    Skeleton,
} from 'antd';
import React, { FC, useEffect, useRef, useState } from 'react';
import Ajax, { Component } from '../../../../component/AjaxResponse';
import { AjaxJson } from '../../../../interface';
import MarkdownView from 'react-markdown';
import {
    LikeButton,
    MarkButton,
    CommentButton,
} from '../../../../component/ActionButton';
import { LeftOutlined } from '@ant-design/icons';
import { baseurl, useUserDetail } from '../../../../auth';
import { useHistory } from 'react-router-dom';

import './index.css';
import { useFetchJson } from '../../../../tools/hook/useFetch';
import Form from 'antd/lib/form/Form';
import FormItem from 'antd/lib/form/FormItem';
import UserLink from '../../../../component/UserLink';

// TODO : add anchor and title, and where shall i put command?

const BackButton: FC = () => {
    const History = useHistory();
    return (
        <Button
            type="text"
            style={{
                width: 'max-content',
                height: 'max-content',
                marginRight: 10,
            }}
            onClick={(e) => {
                e.preventDefault();
                History.goBack();
            }}
        >
            <LeftOutlined style={{ fontSize: 28 }} />
        </Button>
    );
};

const ButtonStyle = { margin: '0 10px' };

const Content: FC<{ content: string }> = ({ content }) => {
    return (
        <Row>
            <Col span={16}>
                <Row>
                    <Col span={8}></Col>
                    <Col span={16}>
                        <MarkdownView
                            className="show-markdown"
                            transformImageUri={(url) => {
                                if (/^https?:\/\//g.test(url)) return url;
                                return baseurl + `/article/${url}`;
                            }}
                            children={content}
                        />
                    </Col>
                </Row>
            </Col>
        </Row>
    );
};

const Action: FC<{ Response: AjaxJson.article }> = ({ Response }) => {
    const [user] = useUserDetail();
    return (
        <Row>
            <Col
                span={24}
                style={{ position: 'sticky', bottom: 0, width: '100%' }}
            >
                <Row>
                    <Col span={16}>
                        <Row>
                            <Col span={16} offset={8}>
                                <Card
                                    style={{
                                        display: 'flex',
                                        width: '100%',
                                        alignItems: 'center',
                                        justifyContent: 'flex-end',
                                        // boxShadow: '0 3px 2px gray',
                                        height: 60,
                                    }}
                                    actions={[
                                        <LikeButton
                                            type={'article'}
                                            amount={
                                                Response.approval -
                                                Response.disapproval
                                            }
                                            initial={
                                                user
                                                    ? user.like.articles.includes(
                                                          Response._id,
                                                      )
                                                    : false
                                            }
                                            id={Response._id}
                                        />,
                                        <MarkButton
                                            amount={Response.markAmount}
                                            type={'article'}
                                            initial={
                                                user
                                                    ? user.marks.includes(
                                                          Response._id,
                                                      )
                                                    : false
                                            }
                                            id={Response._id}
                                        />,
                                        <CommentButton
                                            amount={Response.commentsAmount}
                                            link={`/article/${Response._id}/#comment`}
                                        />,
                                    ]}
                                ></Card>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Col>
        </Row>
    );
};

const AddComment: FC<{ id: string }> = ({ id }) => {
    const [user] = useUserDetail();
    const [comment, setComment] = useState('');
    const [[response, l, error], f, c] = useFetchJson<{
        message: string;
        type: 'info' | 'error';
    }>({
        url: baseurl + `/article/update/${id}/comment`,
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
                            disabled={user === null && comment !== ' '}
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
                            // actions={[
                            //     <LikeButton
                            //         type="article"
                            //         id={`/comment/${comment._id}`}
                            //         initial={false}
                            //         amount={
                            //             comment.approval - comment.disapproval
                            //         }
                            //     />,
                            // ]}
                        />
                    </Card>
                ))}
            </>
        );
    } else {
        return <Empty style={{ width: '100%' }} />;
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
                                url: baseurl + `/article/${id}/comment`,
                            }}
                            Component={Comments}
                        />
                    </Col>
                </Row>
            </Col>
        </Row>
    );
};

const Render: Component<AjaxJson.article> = ({ Response }) => {
    useEffect(() => {
        console.log(Response);
    }, [Response]);
    return (
        <>
            <Row style={{ position: 'sticky', top: '0' }}>
                <Col
                    flex="56px"
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <BackButton />
                </Col>
                <Col
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <h3>
                        <strong>{Response.title}</strong>
                    </h3>
                </Col>
            </Row>
            <Content content={Response.content} />
            <Action Response={Response} />
            <AddComment id={Response._id} />
            <GetComment id={Response._id} />
            <div
                style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    position: 'fixed',
                    bottom: 10,
                    right: 10,
                }}
            >
                <Button type="primary">
                    <a href="#">top</a>
                </Button>
            </div>
        </>
    );
};

export default Render;
