import React from 'react';
import { FC, useEffect } from 'react';
import { AjaxJson } from '../../interface';
import { Form, Input, Button, Checkbox, Row, Col, Divider } from 'antd';
import { useAjaxJson } from '../../tools/hook/useFetch';

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};

const LoginForm: FC<{ setAuth: (X: AjaxJson.user) => void }> = ({
    setAuth,
}) => {
    // const [[res, fetching], F, C] = useAjaxJson();
    return (
        <Form
            {...layout}
            name="basic"
            initialValues={{ remember: true }}
            onFinish={(v) => {}}
        >
            <Form.Item
                label="Username"
                name="username"
                rules={[
                    { required: true, message: 'Please input your username!' },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[
                    { required: true, message: 'Please input your password!' },
                ]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item {...tailLayout} name="remember" valuePropName="checked">
                <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
};

const LoginPage: FC<{ setAuth: (X: AjaxJson.user) => void }> = ({
    setAuth,
}) => (
    <>
        <LoginForm setAuth={setAuth} />
        <Divider />
        <Row>
            <Col>
                <div>
                    <Button>Register</Button>
                </div>
                <Divider />
                <div>
                    <Button>find my password</Button>
                </div>
            </Col>
        </Row>
    </>
);

export default LoginPage;
