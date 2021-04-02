import { Card, Col, Row } from 'antd';
import React, { useEffect, useMemo } from 'react';
import { useParams } from 'react-router';
import { baseurl } from '../../../auth';
import Ajax, { Component } from '../../../component/AjaxResponse';
import { AjaxJson } from '../../../interface';
import { useFetchProps } from '../../../tools/hook/useFetch';

const LeftSide: Component<AjaxJson.article[]> = ({ Response }) =>
    useMemo(
        () => (
            <Row>
                {Response.map((article) => (
                    <Col span={22} offset={1}>
                        <Card
                            // bordered={false}
                            cover={article.coverImgUrl}
                            title={article.title}
                            style={{ margin: '10px 0' }}
                        >
                            {article.content}
                        </Card>
                    </Col>
                ))}
            </Row>
        ),
        [Response],
    );

export default function Tags() {
    const { tag } = useParams<{ tag: string }>();
    const RequestInfo: useFetchProps = {
        url: baseurl + `/article/tags/${tag}`,
        option: {
            method: 'POST',
        },
    };
    return (
        <Row style={{ backgroundColor: 'gray' }}>
            <Col span={20} style={{ padding: 10 }}>
                <Ajax Request={RequestInfo} Component={LeftSide} />
            </Col>
            <Col span={6} style={{ padding: 10 }}></Col>
        </Row>
    );
}
