import { Button, Card, Col, message, Row } from 'antd';
import React from 'react';
import Periodicals from './periodicals';

import { EditOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const f = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.stopPropagation();
    const t = localStorage.getItem('token');
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
                    <Button
                        style={{
                            width: '100%',
                            fontSize: 24,
                            height: 'max-content',
                        }}
                        type="primary"
                    >
                        <Link onClick={f} to="/update/article">
                            <EditOutlined />
                            Write Article
                        </Link>
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
