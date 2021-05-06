import {
    Button,
    Card,
    Col,
    Form,
    Input,
    Mentions,
    Row,
    Select,
    Tag,
    Upload,
} from 'antd';
import { UserInfo } from 'node:os';
import React, { FC, useEffect, useState } from 'react';
import { Redirect } from 'react-router';
import { baseurl, useUserDetail } from '../../../../../auth';
import Ajax, { Component } from '../../../../../component/AjaxResponse';
import UserLink from '../../../../../component/UserLink';
import { AjaxJson } from '../../../../../interface';
import { useFetchJson } from '../../../../../tools/hook/useFetch';
import { InboxOutlined } from '@ant-design/icons';

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
            checked={tags.has(name)}
            onChange={() => {
                setChoose(!choose);
                if (tags.has(name)) {
                    tags.delete(name);
                } else {
                    tags.add(name);
                }
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

export default function InfoForm() {
    const [userInfo] = useUserDetail();
    const [briefIntro, setBriefIntro] = useState('');
    const [title, setTitle] = useState('');
    const [videoSrc, setVideoSrc] = useState<string[]>([]);
    const [coverImgUrl, setCoverImgUrl] = useState('');
    if (!userInfo) {
        return <Redirect to="/" />;
    }
    const [[response, l, error], f, c] = useFetchJson({
        url: baseurl + `/video/upload/${userInfo._id}`,
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
            }),
        },
    });
    return (
        <Row>
            <Col span={16} offset={4}>
                <Form>
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
                    <Form.Item name={['video', 'author']} label="author">
                        <UserLink user={userInfo} />
                    </Form.Item>
                    <Form.Item
                        name={['video', 'briefIntro']}
                        label="briefIntro"
                    >
                        <Input.TextArea
                            maxLength={120}
                            showCount
                            onChange={(e) =>
                                setBriefIntro(e.currentTarget.value)
                            }
                        />
                    </Form.Item>
                    <Form.Item name={['video', 'tags']} label="tags">
                        <Card>
                            <TagChoose />
                        </Card>
                    </Form.Item>
                    <Form.Item label="coverImg">
                        <Upload.Dragger maxCount={1}>
                            <p className="ant-upload-drag-icon">
                                <InboxOutlined />
                            </p>
                            <p className="ant-upload-text">
                                Click or drag file to this area to upload
                            </p>
                            <p className="ant-upload-hint">
                                Support for a single or bulk upload. Strictly
                                prohibit from uploading company data or other
                                band files
                            </p>
                        </Upload.Dragger>
                    </Form.Item>
                    <Form.Item label="video">
                        <Upload.Dragger>
                            <p className="ant-upload-drag-icon">
                                <InboxOutlined />
                            </p>
                            <p className="ant-upload-text">
                                Click or drag file to this area to upload
                            </p>
                            <p className="ant-upload-hint">
                                Support for a single or bulk upload. Strictly
                                prohibit from uploading company data or other
                                band files
                            </p>
                        </Upload.Dragger>
                    </Form.Item>
                    <Form.Item>
                        <Button
                            disabled={title !== '' && videoSrc.length !== 0}
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
