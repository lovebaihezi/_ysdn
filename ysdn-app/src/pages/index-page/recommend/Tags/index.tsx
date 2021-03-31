import React from 'react';
import { Card, Col, Image, Row } from 'antd';
import { FC } from 'react';
import { baseurl } from '../../../../auth';
import { FetchFC, renderFetchResult } from '../../../../FC/FetchFC';
import { AjaxJson } from '../../../../interface';

const TagList: renderFetchResult<AjaxJson.tag[]> = ({ fetchResult }) => {
    return (
        <Row>
            <Col span={24}>
                <Row>
                    {fetchResult.slice(0, 4).map((v) => (
                        <Col span={4} offset={1} key={v.name}>
                            <Card
                                title={v.name}
                                // cover={<Image src={v.imgUrl} width="100%" />}
                                hoverable={true}
                                bordered={false}
                            />
                        </Col>
                    ))}
                </Row>
            </Col>
            <Col span={24} style={{ marginTop: 10 }}>
                <Row>
                    {fetchResult.slice(4, 8).map((v) => (
                        <Col span={4} offset={1} key={v.name}>
                            <Card
                                title={v.name}
                                // cover={<Image src={v.imgUrl} width="100%" />}
                                hoverable={true}
                                bordered={false}
                            />
                        </Col>
                    ))}
                </Row>
            </Col>
        </Row>
    );
};

export default function Tags() {
    return (
        <Row>
            <Col span={20} offset={2}>
                {FetchFC([
                    { url: baseurl + '/tags/all', option: { method: 'POST' } },
                    TagList,
                ])}
            </Col>
        </Row>
    );
}
