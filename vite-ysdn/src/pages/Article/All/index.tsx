import { Row, Col, Card, Divider } from 'antd';
import React, { useEffect, useMemo, useState } from 'react';
import { baseurl } from '../../../auth';
import Ajax, { Component } from '../../../component/AjaxResponse';
import { AjaxJson } from '../../../interface';
import { useFetchProps } from '../../../tools/hook/useFetch';

import {
    EyeOutlined,
    LikeOutlined,
    CommentOutlined,
    StarOutlined,
} from '@ant-design/icons';
import Avatar from 'antd/lib/avatar/avatar';

const LeftSide: Component<AjaxJson.article[]> = ({ Response }) =>
    useMemo(
        () => (
            <Row>
                {Response.map((article) => (
                    <Col span={22} key={article.id} offset={1}>
                        <Card
                            headStyle={{ border: '0' }}
                            bordered={false}
                            title={article.title}
                            actions={[
                                <Row
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                    }}
                                    justify="start"
                                >
                                    <Col span={2}>
                                        <Avatar
                                            src={article.authors[0].avatarUrl}
                                        />
                                        {article.authors[0].Account.nickname}
                                    </Col>
                                    <Col flex="auto">
                                        <Row
                                            className="actionContain"
                                            justify="end"
                                        >
                                            <Col className="action">
                                                <EyeOutlined />
                                                {article.read}
                                            </Col>
                                            <Col className="action">
                                                <LikeOutlined />
                                                {article.approval}
                                            </Col>
                                            <Col className="action">
                                                <CommentOutlined />
                                                {article.commentsAmount}
                                            </Col>
                                            <Col className="action">
                                                <StarOutlined />
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>,
                            ]}
                        >
                            {article.content}
                        </Card>
                    </Col>
                ))}
            </Row>
        ),
        [Response],
    );

//TODO : find the same point over all

export default function All() {
    const [state, setState] = useState<1 | 2>(1);
    const RequestInfo: useFetchProps = {
        url: baseurl + `/article/tags/all`,
        option: {
            method: 'POST',
            body: JSON.stringify({ fetch: `${state === 1 ? 'new' : 'hot'}` }),
        },
    };
    return (
        <Row style={{ backgroundImage: 'gray' }}>
            <Col span={18} style={{ padding: 10 }}>
                <Row>
                    {useMemo(
                        () => (
                            <>
                                <Col span={22} offset={1}>
                                    <code>Newest </code>
                                    <code>Hottest </code>
                                </Col>
                                <Col span={24}>
                                    <Ajax
                                        Request={RequestInfo}
                                        Component={LeftSide}
                                    />
                                </Col>
                            </>
                        ),
                        [RequestInfo],
                    )}
                </Row>
            </Col>
            <Col span={6} style={{ padding: 10 }}></Col>
        </Row>
    );
}
