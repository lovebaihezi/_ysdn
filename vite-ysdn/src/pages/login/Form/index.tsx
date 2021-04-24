import { Button, Divider, Form, Input, message } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { baseurl, useUserDetail } from '../../../auth';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useFetchJson } from '../../../tools/hook/useFetch';
import { Link } from 'react-router-dom';

import './form.css';
import { AjaxJson } from '../../../interface';
import check from '../../../tools/check';
import useError from '../../../tools/hook/useError';

export default function LoginForm() {
    const [form] = useForm<{ username: string; password: string }>();
    const [D, S] = useUserDetail();
    const History = useHistory();
    const [error, setError] = useError();
    const [disable, setDisable] = useState<boolean>(false);
    const login = async (v: any) => {
        if (!disable) {
            setDisable(true);
            const res = await fetch(baseurl + '/user/login', {
                method: 'POST',
                headers: new Headers({ 'Content-Type': 'application/json' }),
                body: JSON.stringify(v),
            });
            const json = await res.json();
            if (check(json)) {
                S(json as AjaxJson.userDetail);
                localStorage.setItem('id', json.id);
                History.goBack();
            } else {
                setError(
                    `${(json as AjaxJson.responseMessage).message},from : ${
                        (json as AjaxJson.responseMessage).from
                    }`,
                );
                setDisable(false);
            }
        }
    };
    useEffect(() => {
        if (error) message.error(error.toString());
    }, [error]);
    useEffect(() => {
        D !== null && History.goBack();
    }, []);
    return (
        <Form
            className="loginForm"
            onFinish={(v) => {
                login(v).catch((e) => {
                    setDisable(false);
                    setError(e);
                });
            }}
            form={form}
            name="login"
        >
            <Form.Item
                name="username"
                rules={[
                    {
                        required: true,
                        message: 'need your username',
                        pattern: /[a-z0-9A-Z]{4,16}/g,
                    },
                ]}
            >
                <Input
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    placeholder="Username"
                />
            </Form.Item>
            <Divider />
            <Form.Item
                name="password"
                rules={[
                    {
                        required: true,
                        message: 'need your password',
                        pattern: /\w{8,20}/g,
                    },
                ]}
            >
                <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Password"
                />
            </Form.Item>
            <Divider />
            <Form.Item>
                <div className="buttonLine">
                    <Button type="primary" disabled={disable} htmlType="submit">
                        Sign in!
                    </Button>
                </div>
            </Form.Item>
            <Divider />
            <Form.Item className="buttonLine">
                <div className="buttonLine">
                    <Link to="/register">
                        <Button type="link">Sign up!</Button>
                    </Link>
                </div>
            </Form.Item>
        </Form>
    );
}
