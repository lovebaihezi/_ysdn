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
import { Redirect, useHistory } from 'react-router';
import { useUserDetail, baseurl, ImageFallback } from '../../../auth';
import { AjaxJson } from '../../../interface';
import useError from '../../../tools/hook/useError';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import {
    RcFile,
    UploadChangeParam,
    UploadFile,
} from 'antd/lib/upload/interface';
import './completeInformation.css';

const UploadButton: FC<{ loading: boolean }> = ({ loading }) => (
    <div>
        {loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div style={{ marginTop: 8 }}>Upload</div>
    </div>
);

const UploadAvatar: FC<{ success: (url: string) => void }> = ({ success }) => {
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImgUrl] = useState('');
    const [user] = useUserDetail();
    function onChange(info: UploadChangeParam) {
        if (info.file.status === 'error') {
            setLoading(false);
            message.error(info.file.response.message);
        }
        if (info.file.status === 'uploading') {
            setLoading(true);
        }
        if (info.file.status === 'done') {
            setLoading(false);
            setImgUrl(
                baseurl +
                    '/user/avatar/' +
                    user?.username +
                    '/' +
                    info.file.name,
            );
            success(info.file.name);
        }
    }
    function beforeUpload(
        file: RcFile,
        FileList: RcFile[],
    ): boolean | {} | Promise<void | File | Blob> {
        const isJpgOrPng = /^image\/\w+$/g.test(file.type);
        if (!isJpgOrPng) {
            message.error('You can only upload image file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 10;
        if (!isLt2M) {
            message.error('Image must smaller than 10MB!');
        }
        return isJpgOrPng && isLt2M;
    }
    return (
        <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            method="post"
            action={baseurl + `/user/update/${user?.username}/avatar`}
            beforeUpload={beforeUpload}
            onChange={onChange}
            style={{
                display: 'flex',
                justifyContent: 'center',
                justifyItems: 'center',
            }}
        >
            {imageUrl ? (
                <img src={imageUrl} alt="avatar" style={{ width: '100%' }} />
            ) : (
                <UploadButton loading={loading} />
            )}
        </Upload>
    );
};

const CompleteInformation: FC = () => {
    const [form] = useForm<{ username: string; password: string }>();
    const [D, S] = useUserDetail();
    if (!D) {
        return <Redirect to="/login" />;
    }
    const History = useHistory();
    const [E, setError] = useError();
    const [disable, setDisable] = useState<boolean>(false);
    const [url, setUrl] = useState(D.avatarUrl);
    const [file, setFile] = useState<UploadFile<any>[]>([]);
    const CompleteInformation = async (v: any) => {
        if (!disable) {
            const res = await fetch(
                baseurl + `/user/completeInformation/${D._id}`,
                {
                    method: 'POST',
                    headers: new Headers({
                        'Content-Type': 'application/json',
                    }),
                    body: JSON.stringify({ ...v, avatarUrl: url }),
                },
            );
            if (res.status === 500) {
                throw new Error(res.statusText);
            }
            const json = await res.json();
            if (!json.message) {
                const res = json as AjaxJson.userDetail;
                console.log(res);
                S(res);
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
            <Form.Item
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
                name="avatarFile"
            >
                <UploadAvatar success={(url: string) => setUrl(url)} />
            </Form.Item>
            <Divider />
            <Form.Item name="nickname">
                <Input
                    type="text"
                    defaultValue={D?.nickname ?? ''}
                    placeholder="nickname"
                />
            </Form.Item>
            <Divider />
            <Form.Item name="email">
                <Input type="text" defaultValue={D.email} placeholder="email" />
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
