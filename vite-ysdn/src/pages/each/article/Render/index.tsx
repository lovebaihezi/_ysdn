import { Affix, Button, Card, Col, Row, Skeleton } from 'antd';
import React, { FC, useEffect, useState } from 'react';
import { Component } from '../../../../component/AjaxResponse';
import { AjaxJson } from '../../../../interface';
import MarkdownView from 'react-showdown';
import {
    LikeButton,
    MarkButton,
    CommentButton,
} from '../../../../component/ActionButton';
import { LeftOutlined } from '@ant-design/icons';
import { useUserDetail } from '../../../../auth';
import { useHistory } from 'react-router-dom';

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

const Render: Component<AjaxJson.article> = ({ Response }) => {
    const [user] = useUserDetail();
    return (
        <>
            <Row>
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
            </Row>
            <Row>
                <Col span={16}>
                    <Row>
                        <Col span={8}></Col>
                        <Col span={16}>
                            <MarkdownView
                                markdown={Response.content.repeat(12)}
                            />
                        </Col>
                    </Row>
                </Col>
            </Row>
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
                                            boxShadow: '0 3px 2px gray',
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
            <div
                style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    position: 'fixed',
                    bottom: 10,
                    right: 10,
                }}
            >
                <Button type="primary">top</Button>
            </div>
        </>
    );
};

export default Render;
