import { Button, Card, Col, Row } from 'antd';
import React from 'react';

import { EditOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

export default function Extra() {
    return (
        <Row>
            <Col className="right" span={22} offset={1}>
                <Card>
                    <Link to={`/update/QA`}>
                        <Button
                            style={{
                                width: '100%',
                                fontSize: 24,
                                height: 'max-content',
                            }}
                            type="primary"
                        >
                            <EditOutlined />
                            Ask Question
                        </Button>
                    </Link>
                </Card>
            </Col>
        </Row>
    );
}
