import { Card, Form, Input, Mentions, Select, Tag } from 'antd';
import { UserInfo } from 'node:os';
import React, { FC } from 'react';
import { useUserDetail } from '../../../../../auth';
import Ajax, { Component } from '../../../../../component/AjaxResponse';
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
                    key={u.Account.nickname}
                    children={u.Account.nickname}
                    value={u.Account.nickname}
                />
            ))}
        </Select>
    );
};

export default function InfoForm() {
    const [userInfo] = useUserDetail();
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
                <Ajax
                    Request={{ url: '', option: { method: 'POST' } }}
                    Component={AuthorOptions}
                    Result={() => <></>}
                />
            </Form.Item>
            <Form.Item name={['video', 'briefIntro']} label="briefIntro">
                <Input.TextArea
                    maxLength={120}
                    showCount
                    onChange={console.log}
                />
            </Form.Item>
            <Form.Item name={['video', 'tags']} label="tags">
                <Ajax
                    Request={{ url: '', option: {} }}
                    Component={TagOptions}
                    Result={() => <></>}
                />
            </Form.Item>
            <Form.Item>
                
            </Form.Item>
        </Form>
    );
}
