import React from 'react';
import { Divider, Card, Row, Col, Image } from 'antd';
import { Link } from 'react-router-dom';
import { baseurl } from '../../../auth';
import { AjaxJson } from '../../../interface';
import { FetchFC, renderFetchResult } from '../../../FC/FetchFC';
import CardAction from '../../../FC/Recommend';

type ActionType = Pick<
    AjaxJson.monographic,
    'read' | 'liked' | 'marked' | 'commentsAmount' | 'title'
>;

const f = (v: AjaxJson.monographic) => {
    const result =
        v?.read !== undefined &&
        v?.title !== undefined &&
        v?.liked !== undefined &&
        v?.marked !== undefined &&
        v?.commentsAmount !== undefined;
    if (result) {
        return (
            <Card
                key={v.id}
                hoverable={true}
                onClick={() => {
                    location.href = `/mongraphic/${v.id}`;
                }}
                actions={[
                    CardAction<ActionType>(v),
                ]}
            >
                <Image
                    src={v.coverUrl}
                    placeholder={<div style={{ height: 250 }}></div>}
                />
            </Card>
        );
    } else {
        return null;
    }
};

const CardContent: renderFetchResult<AjaxJson.monographic[]> = ({
    fetchResult,
}) => {
    return (
        <Row wrap={false}>
            {fetchResult.map((v) => (
                <Col
                    key={v.id}
                    xs={{ span: 20, offset: 2 }}
                    sm={{ span: 10, offset: 2 }}
                    lg={{ span: 8, offset: 0 }}
                    xl={{ span: 6 }}
                    style={{ padding: 10 }}
                >
                    {f(v)}
                </Col>
            ))}
        </Row>
    );
};

export default function Monographic() {
    return (
        <Row style={{ padding: 45 }}>
            <Col span={20} offset={2} style={{ overflow: 'hidden' }}>
                <Divider orientation="left">
                    <h2>Monographic</h2>
                </Divider>
                <Row
                    style={{
                        padding: '6px 0',
                    }}
                >
                    <Col span={24}>
                        {FetchFC<Array<AjaxJson.monographic>>([
                            {
                                url: baseurl + '/render/Monographic/all',
                                option: { method: 'post' },
                            },
                            CardContent,
                        ])}
                    </Col>
                </Row>
            </Col>
        </Row>
    );
}
