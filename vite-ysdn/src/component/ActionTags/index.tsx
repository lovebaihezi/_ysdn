import { Col, Row, Tag } from 'antd';
import React, { FC } from 'react';
import TagLink from '../Tag';

interface T {
    [x: string]: string;
}

const TAG: T = {
    'front-end': '前端',
    'client-side': '客户端',
    'server-side': '服务端',
    QA: '问答',
    media: '媒体',
    algorithm: '算法',
    data: '数据',
    common: '通识',
    product: '产品',
    security: '安全',
    project: '工程',
};

const Tags: FC<{ tags: string[] }> = ({ tags }) => (
    <Row>
        {tags.map((v) => (
            <Col key={v}>
                <TagLink link={`/tag/${v}`}>{TAG[v]}</TagLink>
            </Col>
        ))}
    </Row>
);

export default Tags;
