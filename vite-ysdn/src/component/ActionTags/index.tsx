import { Col, Row, Tag } from 'antd';
import React, { FC } from 'react';
import TagLink from '../Tag';

const Tags: FC<{ tags: string[] }> = ({ tags }) => (
    <Row>
        {tags.slice(0, 4).map((v) => (
            <Col key={v} span={4} offset={1}>
                <TagLink link={`/tag/${v}`}>{v}</TagLink>
            </Col>
        ))}
    </Row>
);

export default Tags;
