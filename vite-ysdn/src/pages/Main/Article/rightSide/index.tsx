import { Button, Card, Col, Row } from 'antd';
import React from 'react';
import Periodicals from './periodicals';

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
                            if (id) {
                                location.href = `/update/article`;
                            } else {
                                location.href = `/login`;
                            }
                        }}
                    >
                        <EditOutlined />
                        Write Article
                    </Button>
                </Card>
            </Col>
            <Col className="right" span={22} offset={1}>
                <Card
                    cover={
                        <img src="http://dummyimage.com/400x300" width="100%" />
                    }
                    bodyStyle={{ padding: 0 }}
                ></Card>
            </Col>
            <Col className="right" span={22} offset={1}>
                <Card
                    cover={
                        <img src="http://dummyimage.com/400x300" width="100%" />
                    }
                    bodyStyle={{ padding: 0 }}
                ></Card>
            </Col>
            <Col span={22} offset={1}>
                <Periodicals name="article" />
            </Col>
        </Row>
    );
}
