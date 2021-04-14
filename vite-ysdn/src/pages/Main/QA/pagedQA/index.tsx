import { Row, Col, Card, Divider, Button, Tag } from 'antd';
import React, { FC, useEffect, useMemo, useState } from 'react';

import {
    EyeOutlined,
    LikeOutlined,
    PlusOutlined,
    StarOutlined,
} from '@ant-design/icons';
import Avatar from 'antd/lib/avatar/avatar';
import { Component } from '../../../../component/AjaxResponse';
import { AjaxJson } from '../../../../interface';

import Action from '../../../../component/Action';

const Actions: FC<{ QA: AjaxJson.QA }> = ({ QA }) => (
    <Action tagPosition="right" tags={QA.tags}>
        <Row>
            <Col span={4}>
                <Button type="primary" color="">
                    <PlusOutlined />
                    follow
                </Button>
            </Col>
            <Col span={4} offset={1}>
                <Button color="blue">{`${QA.answerAmount} answers`}</Button>
            </Col>
            <Col
                offset={1}
                style={{ display: 'flex', alignItems: 'center' }}
                span={4}
            >
                <EyeOutlined />
                <span style={{ padding: '0 4px' }}>{QA.read}</span>
            </Col>
            <Col style={{ display: 'flex', alignItems: 'center' }} span={4}>
                <LikeOutlined />{' '}
                <span style={{ padding: '0 4px' }}>{QA.approval}</span>
            </Col>
            <Col style={{ display: 'flex', alignItems: 'center' }} span={4}>
                <StarOutlined />
            </Col>
        </Row>
    </Action>
);

const PagedQAs: Component<AjaxJson.QA[]> = ({ Response }) =>
    useMemo(
        () => (
            <>
                <Row>
                    {Response.map((QA) => (
                        <Col span={24} key={QA.id}>
                            <Card
                                bordered={false}
                                title={QA.title}
                                actions={[]}
                                headStyle={{ padding: 0, border: 0 }}
                                style={{ cursor: 'pointer' }}
                            >
                                <Card.Meta
                                    title={QA.author.Account.nickname}
                                    avatar={
                                        <Avatar src={QA.author.avatarUrl} />
                                    }
                                    description={QA.title}
                                />
                            </Card>
                            <Actions QA={QA} />
                            <Divider />
                        </Col>
                    ))}
                </Row>
            </>
        ),
        [Response],
    );

export default PagedQAs;
