import {
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
    if (!userInfo) {
        return <Redirect to="/" />;
    }
    return (
        <Form>
            <Form.Item
                name={['video', 'name']}
                label="title"
                rules={[{ required: true }]}
            >
                <Input />
            </Form.Item>
            <Form.Item name={['video', 'author']} label="author">
                <UserLink user={userInfo} />
            </Form.Item>
            <Form.Item name={['video', 'briefIntro']} label="briefIntro">
                <Input.TextArea
                    maxLength={120}
                    showCount
                    onChange={console.log}
                />
            </Form.Item>
            <Form.Item name={['video', 'tags']} label="tags">
                <Card>
                    <TagChoose />
                </Card>
            </Form.Item>
            <Form.Item>
                <Upload></Upload>
            </Form.Item>
        </Form>
    );
}
