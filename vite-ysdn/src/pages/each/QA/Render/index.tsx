import { Button, Card, Col, Row } from 'antd';
import React from 'react';
import { Component } from '../../../../component/AjaxResponse';
import AvatarLink from '../../../../component/AvatarLink';
import TagLink from '../../../../component/Tag';
import { AjaxJson } from '../../../../interface';
import MarkdownView from 'react-showdown';
import { Comment } from 'antd';
import {
    DislikeOutlined,
    LikeOutlined,
    DislikeFilled,
    LikeFilled,
} from '@ant-design/icons';
import UserLink from '../../../../component/UserLink';
//TODO : fix this
const Render: Component<AjaxJson.QA> = ({ Response }) => {
    return (
        <Row>
            <Col span={16} style={{ margin: '40px 0 0 40px' }}>
                <Card>
                    <Row>
                        <Col span={24}>
                            <h1>{Response.title}</h1>
                        </Col>
                        <Col span={24}>
                            <Row>
                                <Col
                                    style={{
                                        justifyContent: 'flex-start',
                                        display: 'flex',
                                    }}
                                >
                                    <UserLink user={Response.author} />
                                </Col>
                                <Col offset={1}>
                                    {Response.createTime.toLocaleString()}
                                </Col>
                                <Col offset={1}>
                                    {Response.tags.map((name) => (
                                        <TagLink link={`/tags/${name}`}>
                                            {name}
                                        </TagLink>
                                    ))}
                                </Col>
                            </Row>
                        </Col>
                        <Col span={24} style={{ marginTop: 40 }}>
                            <Row wrap={false}>
                                <Col flex="50px" style={{ margin: '0 20px' }}>
                                    <Row>
                                        <Col span={22} offset={1}>
                                            <Button>
                                                <LikeOutlined />
                                            </Button>
                                        </Col>
                                        <Col
                                            span={22}
                                            offset={1}
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                            }}
                                        >
                                            {Response.approval -
                                                Response.disapproval}
                                        </Col>
                                        <Col span={22} offset={1}>
                                            <Button>
                                                <DislikeOutlined />
                                            </Button>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col flex="auto">
                                    <MarkdownView markdown={Response.content} />
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Card>
                <Card style={{ marginTop: 40 }}>
                    <Row>
                        {Response.answerAmount >= 1 ? (
                            Response.answer.map((answer) => (
                                <Col key={answer.content}>
                                    <Comment content={answer.content}></Comment>
                                </Col>
                            ))
                        ) : (
                            <Col>
                                <Comment content="no answer"></Comment>
                            </Col>
                        )}
                    </Row>
                </Card>
            </Col>
            <Col offset={1} span={6} style={{ marginTop: 40 }}>
                <Card title="same kind of question">None.</Card>
            </Col>
        </Row>
    );
};

export default Render;
