import { Button, Col, Row } from 'antd';
import React, { FC } from 'react';
import { EditOutlined } from '@ant-design/icons';

export const AnswerButton: FC<{ amount: number }> = ({ amount }) => (
    <Row
        onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
        }}
    >
        <Col span={24}>
            <Button type="primary">
                Answer:{amount}
                <EditOutlined />
            </Button>
        </Col>
    </Row>
);
