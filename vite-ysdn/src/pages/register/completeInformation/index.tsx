import {
    message,
    Form,
    Input,
    Divider,
    Button,
    Upload,
    Image,
    Col,
    Row,
} from 'antd';
import { useForm } from 'antd/lib/form/Form';
import React, { FC, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { useRouteMatch } from 'react-router-dom';
import { useUserDetail, baseurl, ImageFallback } from '../../../auth';
import { AjaxJson } from '../../../interface';
import useError from '../../../tools/hook/useError';
import { useFetchJson } from '../../../tools/hook/useFetch';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import './completeInformation.css';

const CompleteInformation: FC = () => {
    const [form] = useForm<{ username: string; password: string }>();
    const [D, S] = useUserDetail();
    const History = useHistory();
    const [E, setError] = useError();
    const [disable, setDisable] = useState<boolean>(false);
    const [url, setUrl] = useState('');
    const CompleteInformation = async (v: any) => {
        if (!disable) {
            const res = await fetch(baseurl + '/user/completeInformation', {
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
                History.push(`/`);
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
            className="completeInformation"
            onFinish={(v) => {
                CompleteInformation(v).catch((e) => {
                    setDisable(false);
                    setError(e);
                });
            }}
            form={form}
            name="CompleteInformation"
        >
            <Row>
                <Col
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignContent: 'center',
                    }}
                    span={24}
                >
                    <Upload
                        onChange={(info) => {
                            if (info.event?.percent === 100) {
                                console.log(info);
                                // setUrl(info.file.thumbUrl);
                            }
                        }}
                        action={baseurl + '/article/picture'}
                        maxCount={1}
                    >
                        <Button>upload Avatar</Button>
                    </Upload>
                </Col>
            </Row>
            <Row>
                <Col
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignContent: 'center',
                    }}
                    span={24}
                >
                    <Image
                        width={100}
                        height={100}
                        src={url && 'https://dummyimage.com/100x100'}
                    />
                </Col>
            </Row>
            <Divider />
            <Form.Item name="username">
                <Input />
            </Form.Item>
            <Divider />
            <Form.Item name="nickname">
                <Input type="text" placeholder="nickname" />
            </Form.Item>
            <Divider />
            <Form.Item name="password">
                <Input />
            </Form.Item>
            <Divider />
            <Form.Item name="confirm-password">
                <Input />
            </Form.Item>
            <Divider />
            <Form.Item>
                <div className="buttonLine">
                    <Button type="primary" disabled={disable} htmlType="submit">
                        complete
                    </Button>
                </div>
            </Form.Item>
            <Form.Item>
                <div className="buttonLine">
                    <Button onClick={() => History.push('/')} type="link">
                        skip
                    </Button>
                </div>
            </Form.Item>
        </Form>
    );
};

export default CompleteInformation;
