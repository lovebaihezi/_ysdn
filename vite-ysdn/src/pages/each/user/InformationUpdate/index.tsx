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
import { useUserDetail, baseurl, ImageFallback } from '../../../../auth';
import { AjaxJson } from '../../../../interface';
import useError from '../../../../tools/hook/useError';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import {
    RcFile,
    UploadChangeParam,
    UploadFile,
} from 'antd/lib/upload/interface';

const UploadButton: FC<{ loading: boolean }> = ({ loading }) => (
    <div>
        <div
            style={{
                marginTop: 8,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            {/* {loading ? <LoadingOutlined /> : <PlusOutlined />} */}
            <strong>更换头像</strong>
        </div>
    </div>
);

const UploadAvatar: FC<{ success: (url: string) => void }> = ({ success }) => {
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImgUrl] = useState('');
    const [user] = useUserDetail();
    if (user === null) {
        return null;
    }
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
                baseurl + `/user/avatar/${user?.username}/${info.file.name}`,
            );
            success(info.file.name);
        }
    }
    async function beforeUpload(
        file: RcFile,
        FileList: RcFile[],
    ): Promise<boolean | void | File | Blob> {
        const isJpgOrPng = /^image\/\w+$/g.test(file.type);
        if (!isJpgOrPng) {
            message.error('You can only upload image file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 20;
        if (!isLt2M) {
            message.error('Image must smaller than 20MB!');
        }
        return isJpgOrPng && isLt2M;
    }
    return (
        <Upload
            name="avatar"
            listType="picture-card"
            showUploadList={false}
            method="post"
            action={baseurl + `/user/update/${user.username}/avatar`}
            beforeUpload={beforeUpload}
            onChange={onChange}
        >
            <Row>
                <Col span={24} className="avatar-uploader">
                    {imageUrl ? (
                        <Image
                            src={imageUrl}
                            alt="avatar"
                            style={{ width: '100%' }}
                        />
                    ) : (
                        <UploadButton loading={loading} />
                    )}
                </Col>
            </Row>
        </Upload>
    );
};

const NickNameInput: FC<{ defaultValue: string }> = ({ defaultValue }) => {
    const [nickname, setNickName] = useState<string>(defaultValue);
    return (
        <Input
            type="text"
            placeholder={defaultValue}
            // defaultValue={defaultValue}
            value={nickname}
            onChange={(e) => setNickName(e.currentTarget.value)}
        />
    );
};

const CompleteInformation: FC = () => {
    const [form] = useForm<{ username: string; password: string }>();
    const [D, S] = useUserDetail();
    if (D === null) {
        return <Redirect to="/login" />;
    }
    const History = useHistory();
    const [E, setError] = useError();
    const [disable, setDisable] = useState<boolean>(false);
    const [url, setUrl] = useState(D.avatarUrl);
    const CompleteInformation = async (v: any) => {
        if (D.email) {
            console.log(v);
            const { email, ...rest } = v;
            v = rest;
        }
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
                S(res);
                History.push(`/user/${D.username}`);
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
            <Form.Item
                name="nickname"
                required={true}
                label="昵称"
                initialValue={D.nickname}
            >
                <Input
                    type="text"
                    // onInput={(e) => {
                    //     setNickname(e.currentTarget.value);
                    // }}
                    // value={nickname}
                    placeholder="nickname"
                />
            </Form.Item>
            <Divider />
            <Form.Item>
                <div className="buttonLine">
                    <Button type="primary" disabled={disable} htmlType="submit">
                        完成
                    </Button>
                </div>
            </Form.Item>
        </Form>
    );
};

export default function Information() {
    return (
        <Row>
            <Col
                span={18}
                offset={3}
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: 640,
                    maxHeight: 'calc(100vh - 60px)',
                }}
            >
                <div>
                    <CompleteInformation />
                </div>
            </Col>
        </Row>
    );
}
