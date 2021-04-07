import { Button, Divider, Form, Input, message } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { baseurl, useUserDetail } from '../../../auth';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { AjaxJson } from '../../../interface';
import check from '../../../tools/check';
import useError from '../../../tools/hook/useError';

export default function RegisterForm() {
    const [form] = useForm<{ username: string; password: string }>();
    const [D, S] = useUserDetail();
    const History = useHistory();
    const [E, setError] = useError();
    const [disable, setDisable] = useState<boolean>(false);
    const [regexp, setRegexp] = useState<string>('');
    const login = async (v: any) => {
        if (!disable) {
            setDisable(true);
            const res = await fetch(baseurl + '/register', {
                method: 'POST',
                // headers: new Headers({ 'Content-Type': 'application/json' }),
                body: JSON.stringify(v),
            });
            if (res.status === 404) {
                throw new Error('404 Not Found!');
            }
            const json: AjaxJson.userDetail = await res.json();
            if (check(json)) {
                S(json);
                localStorage.setItem('token', json.username);
                location.href = '/chooseTags'
            } else {
                setDisable(false);
            }
        }
    };
    useEffect(() => {
        if (E) message.error(E.message);
    }, [E]);
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
                    onChange={console.log}
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Password"
                    onInput={(e) => {
                        setRegexp(`^${e.currentTarget.value}\$`);
                        console.log(new RegExp(`^${e.currentTarget.value}$`));
                    }}
                />
            </Form.Item>
            <Divider />
            <Form.Item
                name="confirm-password"
                rules={[
                    {
                        required: true,
                        message: 'should be as same as password',
                        pattern: new RegExp(regexp),
                    },
                ]}
            >
                <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Confirm"
                />
            </Form.Item>
            <Divider />
            <Form.Item>
                <div className="buttonLine">
                    <Button type="primary" disabled={disable} htmlType="submit">
                        Sign up!
                    </Button>
                </div>
            </Form.Item>
        </Form>
    );
}
