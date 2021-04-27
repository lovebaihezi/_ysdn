import { Button, Card, Col, message, Row } from 'antd';
import React from 'react';

import { EditOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const f = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.stopPropagation();
    const t = localStorage.getItem('id');
    if (t === null) {
        e.preventDefault();
        message.info("you haven't login yet!");
    }
};

export default function Extra() {
    return (
        <Row>
            <Col className="right" span={22} offset={1}>
                <Card>
                    <Link onClick={f} to={`/update/QA`}>
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
