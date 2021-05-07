import { Col, Row, Tag } from 'antd';
import React, { FC } from 'react';
import TagLink from '../Tag';

const Tags: FC<{ tags: string[] }> = ({ tags }) => (
    <Row>
        {tags.map((v) => (
            <Col key={v}>
                <TagLink link={`/tag/${v}`}>{v}</TagLink>
            </Col>
        ))}
    </Row>
);

export default Tags;
