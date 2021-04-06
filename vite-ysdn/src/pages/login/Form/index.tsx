import { Button, Divider, Form, Input } from 'antd';
import { useForm } from 'antd/lib/form/Form';

import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { useUserDetail } from '../../../auth';

import { UserOutlined, LockOutlined } from '@ant-design/icons';

import './form.css';

export default function LoginForm() {
    const [form] = useForm<{}>();
    const [json, setJson] = useState<{}>();
    const [D, S] = useUserDetail();
    const H = useHistory();
    useEffect(() => {
        D !== null && H.goBack();
    }, [...Object.values(D ?? {})]);
    return (
        <Form className="loginForm" form={form} name="login">
            <Form.Item name="username">
                <Input
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    placeholder="Username"
                />
            </Form.Item>
            <Divider />
            <Form.Item>
                <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Password"
                />
            </Form.Item>
            <Divider />
            <Form.Item>
                <div className="buttonLine">
                    <Button type="primary" htmlType="submit">
                        Sign in!
                    </Button>
                </div>
            </Form.Item>
            <Divider />
            <Form.Item className="buttonLine">
                <div className="buttonLine">
                    <Button type="link">Sign up!</Button>
                </div>
            </Form.Item>
        </Form>
    );
}
