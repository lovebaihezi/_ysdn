import { Col, Row, Tag } from 'antd';
import React from 'react';
import { FC } from 'react';
import TagLink from '../tag';

const Action: FC<{ tags?: string[]; tagPosition?: 'right' | 'left' }> = ({
    tags,
    children,
    tagPosition,
}) => {
    tagPosition = tagPosition ?? 'left';
    return (
        <Row wrap={false} style={{ padding: '12px 24px' }}>
            {tags && (
                <Col span={12} push={tagPosition === 'left' ? 0 : 12}>
                    <Row
                        style={{ height: '100%' }}
                        justify={tagPosition === 'left' ? 'start' : 'end'}
                    >
                        {tags.map((tag) => (
                            <Col
                                style={{
                                    height: '100%',
                                    display: 'flex',
                                    alignItems: 'center',
                                }}
                                span={24 / tags.length}
                                key={tag}
                            >
                                <TagLink to={`/tags/${tag}`}>{tag}</TagLink>
                            </Col>
                        ))}
                    </Row>
                </Col>
            )}
            <Col
                className="action"
                pull={tagPosition === 'left' ? 0 : 12}
                flex="auto"
            >
                {children}
            </Col>
        </Row>
    );
};

export default Action;
