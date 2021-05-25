import {
    Col,
    Row,
    Form,
    Input,
    Upload,
    Button,
    message,
    Card,
    Empty,
    Tag,
} from 'antd';
import React, { FC } from 'react';
import { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { baseurl, useUserDetail } from '../../../../auth';
import Ajax, { Component } from '../../../../component/AjaxResponse';
import UserLink from '../../../../component/UserLink';

const RenderTags: FC<{ tags: string[] }> = ({ tags }) => {
    const [user] = useUserDetail();
    if (user === null) {
        return null;
    }
    return (
        <>
            {tags.map((v) => (
                <Card title={v} key={v}>
                    <Card.Meta
                        avatar={<UserLink user={user} />}
                        description={<code>{new Date().toString()}</code>}
                    />
                </Card>
            ))}
        </>
    );
};

type tagInfo = { name: string; createTime: string };

const UpdateTag: Component<tagInfo[]> = ({ Response }) => {
    const [value, setValue] = useState<string>('');
    const [tags, setTags] = useState<string[]>(
        Response.map(({ name }) => name),
    );
    const [user] = useUserDetail();
    if (user === null) {
        return null;
    }
    const Center = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    };
    const addTag = async () => {
        if (value !== '' && value.length <= 8) {
            const result = await fetch(
                `${baseurl}/tag/nonExistThenInsert?value=${value}&user=${user.username}`,
            );
            switch (await result.text()) {
                case 'ok':
                    setTags([...tags, value]);
                    setValue('');
                    break;
                default:
                    message.error('该标签已存在');
                    break;
            }
        } else {
            message.warn('标签长度需要小于8');
        }
    };
    return (
        <Form>
            <Card style={{ marginBottom: 30 }}>
                <Row>
                    <Col flex="auto">
                        <Input
                            value={value}
                            onInput={({ currentTarget }) =>
                                setValue(currentTarget.value)
                            }
                        />
                    </Col>
                    <Col>
                        <Button onClick={() => addTag()} type="primary">
                            确定
                        </Button>
                    </Col>
                </Row>
            </Card>
            {tags.length === 0 ? (
                <Empty description="你还没有添加过标签哦" />
            ) : (
                <RenderTags tags={tags} />
            )}
        </Form>
    );
};

export default function UserUpdateTag() {
    const [user] = useUserDetail();
    if (user === null) {
        return <Redirect to="/login" />;
    }
    return (
        <Row>
            <Col span={18} offset={3}>
                <Ajax
                    Request={{ url: baseurl + `/tag/userTag/${user.username}` }}
                    Component={UpdateTag}
                />
            </Col>
        </Row>
    );
}
