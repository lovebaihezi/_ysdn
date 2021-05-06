import {
    Button,
    Card,
    Col,
    Form,
    Input,
    Mentions,
    message,
    Row,
    Select,
    Tag,
    Upload,
} from 'antd';
import { UserInfo } from 'node:os';
import React, { FC, useEffect, useState } from 'react';
import { Redirect, useHistory } from 'react-router';
import { baseurl, useUserDetail } from '../../../../../auth';
import Ajax, { Component } from '../../../../../component/AjaxResponse';
import UserLink from '../../../../../component/UserLink';
import { AjaxJson } from '../../../../../interface';
import { useFetchJson } from '../../../../../tools/hook/useFetch';
import { InboxOutlined } from '@ant-design/icons';
import { RcFile, UploadChangeParam } from 'antd/lib/upload';

const TagOptions: Component<string[]> = ({ Response }) => {
    return (
        <Mentions>
            {Response.map((tag) => (
                <Mentions.Option key={tag} value={tag}></Mentions.Option>
            ))}
        </Mentions>
    );
};

const AuthorOptions: Component<AjaxJson.userInfo[]> = ({ Response }) => {
    return (
        <Select>
            {Response.map((u) => (
                <Select.Option
                    key={u.nickname}
                    children={u.nickname}
                    value={u.nickname}
                />
            ))}
        </Select>
    );
};

const tags = new Set<string>();

const Each: FC<{ name: string }> = ({ name }) => {
    const [choose, setChoose] = useState(false);
    useEffect(() => {
        if (choose) {
            tags.add(name);
        } else {
            tags.delete(name);
        }
    }, [choose]);
    return (
        <Tag.CheckableTag
            className="tag-chose"
            checked={choose}
            onChange={() => {
                if (tags.size < 3) setChoose(!choose);
                else message.warn('you should only choose three!');
            }}
        >
            {name}
        </Tag.CheckableTag>
    );
};

const AllTag: Component<string[]> = ({ Response }) => {
    return (
        <Row>
            {Response.map((name) => (
                <Col key={name} span={24 / Response.length}>
                    <Each name={name} />
                </Col>
            ))}
        </Row>
    );
};

const TagChoose: FC = () => {
    return <Ajax Request={{ url: baseurl + `/tag` }} Component={AllTag} />;
};

const UploadCover: FC<{ success: (url: string) => void }> = ({ success }) => {
    const [userInfo] = useUserDetail();
    if (!userInfo) {
        return null;
    }
    const BeforeCoverUpload: (file: RcFile, FileList: RcFile[]) => boolean = (
        file,
        FileList,
    ) => {
        console.log(file);
        if (!/^image\/\w+$/g.test(file.type)) {
            message.error('you should upload a picture!');
            return false;
        }
        return true;
    };
    const onCoverChange = (info: UploadChangeParam) => {
        if (info.file.status === 'error') {
            message.error('upload failed!');
        }
        if (info.file.status === 'done') {
            message.success('done!');
            success(info.file.name);
        }
    };
    return (
        <Upload.Dragger
            action={baseurl + `/video/upload/picture/${userInfo.username}`}
            method="post"
            maxCount={1}
            beforeUpload={BeforeCoverUpload}
            onChange={onCoverChange}
            listType="picture"
        >
            <p className="ant-upload-drag-icon">
                <InboxOutlined />
            </p>
            <p className="ant-upload-text">
                Click or drag file to this area to upload
            </p>
            <p className="ant-upload-hint">
                Support for a single or bulk upload. Strictly prohibit from
                uploading company data or other band files
            </p>
        </Upload.Dragger>
    );
};

const UploadVideo: FC<{ success: (urls: string[]) => void }> = ({
    success,
}) => {
    const [userInfo] = useUserDetail();
    if (!userInfo) {
        return null;
    }
    const BeforeVideoUpload: (file: RcFile, FileList: RcFile[]) => boolean = (
        file,
        FileList,
    ) => {
        console.log(file);
        if (!/^video\/[a-zA-Z0-9]+$/g.test(file.type)) {
            message.error('you should upload a video!');
            return false;
        }
        return true;
    };
    const onVideoChange = (info: UploadChangeParam) => {
        if (info.file.status === 'error') {
            message.error('upload failed!');
        }
        if (info.file.status === 'done') {
            message.success('done!');
            success([info.file.name]);
        }
    };
    return (
        <Upload.Dragger
            action={baseurl + `/video/upload/video/${userInfo.username}`}
            method="post"
            maxCount={40}
            beforeUpload={BeforeVideoUpload}
            onChange={onVideoChange}
        >
            <p className="ant-upload-drag-icon">
                <InboxOutlined />
            </p>
            <p className="ant-upload-text">
                Click or drag file to this area to upload
            </p>
            <p className="ant-upload-hint">
                Support for a single or bulk upload. Strictly prohibit from
                uploading company data or other band files
            </p>
        </Upload.Dragger>
    );
};

export default function InfoForm() {
    const [userInfo] = useUserDetail();
    const [briefIntro, setBriefIntro] = useState('');
    const [title, setTitle] = useState('');
    const [videoSrc, setVideoSrc] = useState<string[]>([]);
    const [coverImgUrl, setCoverImgUrl] = useState('');
    const H = useHistory();
    if (!userInfo) {
        return <Redirect to="/login" />;
    }
    const [[response, l, error], f, c] = useFetchJson<any>({
        url: baseurl + `/video/${userInfo._id}`,
        option: {
            method: 'POST',
            headers: new Headers({ 'Content-Type': 'application/json' }),
            body: JSON.stringify({
                briefIntro,
                title,
                author: {
                    username: userInfo.username,
                    nickname: userInfo.nickname,
                    avatarUrl: userInfo.avatarUrl,
                },
                videoSrc,
                tags: [...tags],
                coverImgUrl,
            }),
        },
    });
    useEffect(() => {
        if (response?.message) {
            message.info(response?.message);
        } else if (error) {
            message.error(error);
        } else if (response) {
            message.success('success!');
            H.replace('/videos');
        }
    }, [response, error]);
    return (
        <Row>
            <Col span={16} offset={4}>
                <Form
                    onFinish={(value) => {
                        f().catch(c);
                    }}
                >
                    <Form.Item
                        name={['video', 'name']}
                        label="title"
                        rules={[{ required: true }]}
                    >
                        <Input
                            value={title}
                            onChange={(e) => setTitle(e.currentTarget.value)}
                        />
                    </Form.Item>
                    <Form.Item name={'author'} label="author">
                        <UserLink user={userInfo} />
                    </Form.Item>
                    <Form.Item
                        name={'briefIntro'}
                        label="briefIntro"
                        initialValue=""
                    >
                        <Input.TextArea
                            maxLength={120}
                            showCount
                            onChange={(e) =>
                                setBriefIntro(e.currentTarget.value)
                            }
                        />
                    </Form.Item>
                    <Form.Item label="tags" required={true}>
                        <Card>
                            <TagChoose />
                        </Card>
                    </Form.Item>
                    <Form.Item label="coverImg" required={true}>
                        <UploadCover
                            success={(url) =>
                                setCoverImgUrl(
                                    baseurl +
                                        `/video/cover/${userInfo.username}/${url}`,
                                )
                            }
                        />
                    </Form.Item>
                    <Form.Item label="video" required={true}>
                        <UploadVideo
                            success={(urls) =>
                                setVideoSrc([...videoSrc, ...urls])
                            }
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button
                            disabled={
                                title === '' ||
                                videoSrc.length === 0 ||
                                tags.size !== 3 ||
                                coverImgUrl === ''
                            }
                            type="primary"
                            htmlType="submit"
                        >
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Col>
        </Row>
    );
}
