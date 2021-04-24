import { Button, Col, Row } from 'antd';
import React, { FC, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';

export const FollowButton: FC<{ amount: number; initial: boolean }> = ({
    amount,
}) => {
    const [] = useState();
    return (
        <Row
            onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
            }}
        >
            <Col span={24}>
                <Button type="default">
                    follow
                    <PlusOutlined />
                </Button>
            </Col>
        </Row>
    );
};
