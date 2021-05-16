import { Button, Divider, Form, Input, message } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import React, { useEffect, useState } from 'react';
import { useHistory, useRouteMatch } from 'react-router';
import { baseurl, useUserDetail } from '../../../auth';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { AjaxJson } from '../../../interface';
import check from '../../../tools/check';
import useError from '../../../tools/hook/useError';
import { Link } from 'react-router-dom';

export default function RegisterForm() {
    const { url, path } = useRouteMatch();
    const [form] = useForm<{ username: string; password: string }>();
    const [D, S] = useUserDetail();
    const History = useHistory();
    const [E, setError] = useError();
    const [disable, setDisable] = useState<boolean>(false);
    const [regexp, setRegexp] = useState<string>('');
    const register = async (v: any) => {
        if (!disable) {
            setDisable(true);
            const res = await fetch(baseurl + '/user/register', {
                method: 'POST',
                headers: new Headers({ 'Content-Type': 'application/json' }),
                body: JSON.stringify(v),
            });
            if (res.status === 500) {
                throw new Error(res.statusText);
            }
            const json = await res.json();
            if (!json.message) {
                const res = json as AjaxJson.userDetail;
                S(res);
                localStorage.setItem('id', res._id);
                History.push(`${url}/chooseTags`);
            } else {
                const res = json as AjaxJson.responseMessage;
                setError(`${res?.type} : ${res.message}`);
                setDisable(false);
            }
        }
    };
    useEffect(() => {
        if (E) message.error(E.message);
    }, [E]);
    return (
        <Form
            className="registerForm"
            onFinish={(v) => {
                register(v).catch((e) => {
                    setDisable(false);
                    setError(e);
                });
            }}
            form={form}
            name="register"
        >
            <Form.Item
                name="username"
                rules={[
                    {
                        required: true,
                        message: '不可为空',
                        pattern: /[a-z0-9A-Z]{4,16}/g,
                    },
                ]}
            >
                <Input
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    placeholder="用户名"
                />
            </Form.Item>
            <Divider />
            <Form.Item
                name="password"
                rules={[
                    {
                        required: true,
                        message: '应仅含字母数字',
                        pattern: /[0-9a-zA-Z]{8,20}/g,
                    },
                ]}
            >
                <Input
                    // onChange={console.log}
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="密码"
                    onInput={(e) => {
                        setRegexp(`^${e.currentTarget.value}\$`);
                    }}
                />
            </Form.Item>
            <Divider />
            <Form.Item
                name="confirm-password"
                rules={[
                    {
                        required: true,
                        message: '与密码应一致',
                        pattern: new RegExp(regexp),
                    },
                ]}
            >
                <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="确认密码"
                />
            </Form.Item>
            <Divider />
            <Form.Item>
                <div className="buttonLine">
                    <Button type="primary" disabled={disable} htmlType="submit">
                        注册!
                    </Button>
                </div>
            </Form.Item>
        </Form>
    );
}
