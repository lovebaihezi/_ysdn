import { Button, Card, Col, Row } from 'antd';
import React from 'react';

import { EditOutlined } from '@ant-design/icons';

export default function Extra() {
    return (
        <Row>
            <Col className="right" span={22} offset={1}>
                <Card>
                    <Button
                        style={{
                            width: '100%',
                            fontSize: 24,
                            height: 'max-content',
                        }}
                        type="primary"
                        onClick={() => {
                            const id = sessionStorage.getItem('id');
                            // if (id) {
                                location.href = `/update/QA`;
                            // } else {
                                // location.href = `/login`;
                            // }
                        }}
                    >
                        <EditOutlined />
                        Ask Question
                    </Button>
                </Card>
            </Col>
        </Row>
    );
}
