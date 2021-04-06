import { Col, Row } from 'antd';
import React from 'react';
import LoginForm from './Form';

import { KeyOutlined } from '@ant-design/icons';

import './Login.css';

export default function Login() {
    return (
        <Row>
            <Col className="eachLine" span={24}>
                <img src="picture/b3.svg" />
            </Col>
            <Col
                className="eachLine"
                style={{ height: 'calc(100vh - 60px)' }}
                span={24}
            >
                <LoginForm />
            </Col>
        </Row>
    );
}
