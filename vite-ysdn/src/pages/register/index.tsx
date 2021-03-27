import { FC, useEffect } from 'react';
import { AjaxJson } from '../../interface';
import React from 'react';
import { Form, Input, Button, Checkbox, Row, Col, Divider } from 'antd';
import { Link } from 'react-router-dom';
import { LockOutlined, UserOutlined } from '@ant-design/icons';

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};

const RegisterForm: FC<{ setAuth: (X: AjaxJson.user) => void }> = ({
    setAuth,
}) => {
    return (
        <Form
            name="normal_login"
            className="register-form"
            initialValues={{ remember: true }}
            onFinish={console.log}
        >
            <Form.Item
                name="username"
                rules={[
                    { required: true, message: 'Please input your Username!' },
                ]}
            >
                <Input
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    placeholder="Username"
                />
            </Form.Item>
            <Form.Item
                name="password"
                rules={[
                    { required: true, message: 'Please input your Password!' },
                ]}
            >
                <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Password"
                />
            </Form.Item>
            <Form.Item>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>
            </Form.Item>

            <Form.Item>
                <Button
                    type="primary"
                    htmlType="submit"
                    className="register-form-button"
                >
                    register
                </Button>
                Or <Link to="/login">login now!</Link>
            </Form.Item>
        </Form>
    );
};

const RegisterPage: FC<{ setAuth: (X: AjaxJson.user) => void }> = ({
    setAuth,
}) => (
    <>
        <Row>
            <Col span={16} offset={4}>
                <Row>
                    <Col offset={8} span={8}>
                        <RegisterForm setAuth={setAuth} />
                    </Col>
                </Row>
            </Col>
        </Row>
    </>
);

export default RegisterPage;
