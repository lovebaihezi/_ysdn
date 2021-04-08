import { Affix, Button, Card, Col, Row, Skeleton } from 'antd';
import React, { useEffect, useState } from 'react';
import { Component } from '../../../../component/AjaxResponse';
import { AjaxJson } from '../../../../interface';
import MarkdownView from 'react-showdown';
import { LikeOutlined, StarOutlined, CommentOutlined } from '@ant-design/icons';

// TODO : add anchor and title, and where shall i put command?

const ButtonStyle = { margin: '0 10px' };

const Render: Component<AjaxJson.article> = ({ Response }) => {
    return (
        <>
            <Row>
                <Col span={16}>
                    <Row>
                        <Col span={8}></Col>
                        <Col span={16}>
                            <MarkdownView
                                markdown={Response.content.repeat(10)}
                            />
                        </Col>
                    </Row>
                </Col>
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
                                    >
                                        <Button style={ButtonStyle}>
                                            <LikeOutlined />
                                            {Response.like.length}
                                        </Button>
                                        <Button style={ButtonStyle}>
                                            <CommentOutlined />
                                            {Response.commentsAmount}
                                        </Button>
                                        <Button style={ButtonStyle}>
                                            <StarOutlined />
                                            {Response.markAmount}
                                        </Button>
                                    </Card>
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
