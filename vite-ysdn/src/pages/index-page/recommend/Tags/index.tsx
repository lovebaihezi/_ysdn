import React from 'react';
import { Col, Row } from 'antd';
import { FC } from 'react';
import { baseurl } from '../../../../auth';
import { FetchFC, renderFetchResult } from '../../../../FC/FetchFC';

const TagList: renderFetchResult<Array<{ imgUrl: string; tagName: string }>> = ({ fetchResult }) => {
    return (
        <Row>
            <Col>
                <Row>
                    {fetchResult.slice(0, 4).map((v) => (
                        <Col span={4} offset={1} key={v?.imgUrl}>
                            {JSON.stringify(v)}
                        </Col>
                    ))}
                </Row>
            </Col>
            <Col>
                <Row>
                    {fetchResult.slice(4).map((v) => (
                        <Col span={4} offset={1} key={v?.imgUrl}>
                            {JSON.stringify(v)}
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
                {FetchFC([{ url: baseurl + '/tags/all', option: {} }, TagList])}
            </Col>
        </Row>
    );
}
