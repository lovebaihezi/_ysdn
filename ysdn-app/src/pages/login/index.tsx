import React from 'react';
import { FC, useEffect } from 'react';
import { AjaxJson } from '../../interface';
import { Form, Input, Button, Checkbox, Row, Col, Divider } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useForm } from 'antd/lib/form/Form';

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};

const LoginForm: FC<{ setAuth: (X: string) => void }> = ({ setAuth }) => {
    const [form] = useForm();
    return (
        <Form
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={(...rest) => console.log(...rest)}
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
                    className="login-form-button"
                >
                    Log in
                </Button>
                Or <Link to="/register">register now!</Link>
            </Form.Item>
        </Form>
    );
};

const LoginPage: FC<{ setAuth: (X: string) => void }> = ({ setAuth }) => (
    <Row>
        <Col span={16} offset={4}>
            <Row>
                <Col offset={8} span={8}>
                    <LoginForm setAuth={setAuth} />
                </Col>
            </Row>
        </Col>
    </Row>
);

export default LoginPage;
