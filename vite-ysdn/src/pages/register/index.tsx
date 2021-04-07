import { Row, Col } from 'antd';
import React from 'react';
import { Switch } from 'react-router';
import RegisterForm from './Form';

export default function Register() {
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
                <RegisterForm />
            </Col>
        </Row>
    );
}
