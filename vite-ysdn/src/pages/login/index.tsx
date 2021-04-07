import { Col, Row } from 'antd';
import React from 'react';
import LoginForm from './Form';

import './Login.css';

export default function Login() {
    return (
        <Row>
            <Col
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
                span={24}
            >
                <img style={{ height: '100%' }} src="picture/b3.svg" />
            </Col>
            <Col
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: 'calc(100vh - 260px)',
                    minHeight: 480,
                }}
                span={24}
            >
                <LoginForm />
            </Col>
        </Row>
    );
}
