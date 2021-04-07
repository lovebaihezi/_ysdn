import { Button, Card, Col, message, Row } from 'antd';
import React, { FC, useEffect, useRef, useState } from 'react';
import { Component } from '../../../component/AjaxResponse';

import { HeartOutlined, SendOutlined } from '@ant-design/icons';
import { useFetchJson } from '../../../tools/hook/useFetch';
import { baseurl, useUserDetail } from '../../../auth';

const Tag: FC<{ name: string; src?: string; container: Set<string> }> = ({
    name,
    src,
    container,
}) => {
    const [state, setState] = useState<boolean>(false);
    return (
        <Card
            hoverable={true}
            cover={
                <div style={{ justifyContent: 'center', display: 'flex' }}>
                    <img height="100px" src="https://dummyimage.com/100x100" />
                </div>
            }
            onClick={() => {
                if (!state) {
                    setState(true);
                    container.add(name);
                } else {
                    setState(false);
                    container.delete(name);
                }
            }}
            actions={[state ? <HeartOutlined /> : null]}
        >
            {name}
        </Card>
    );
};

const SubmitButton: FC<{ container: Set<string> }> = ({ container }) => {
    const [D] = useUserDetail();
    const [[r, l, e], f, c] = useFetchJson<{}>({
        url: baseurl + `/${D?.username}/addTag`,
        option: {
            method: 'post',
            body: JSON.stringify([...container.values()]),
        },
    });
    useEffect(() => {
        if (l) {
            message.loading('loading');
        } else if (e) {
            message.error('error!, skip...');
            location.href = '/';
        } else {
            message.success('');
            location.href = '/';
        }
    }, [l, e]);
    return (
        <Button
            onClick={async () => {
                await f().catch(c);
            }}
            size="large"
            type="primary"
            icon={<SendOutlined />}
        >
            ok
        </Button>
    );
};

const Tags: Component<string[]> = ({ Response }) => {
    const C = new Set<string>();
    return (
        <Row>
            {Response.map((tag) => (
                <Col span={4} style={{ padding: 40 }} key={tag}>
                    <Tag container={C} name={tag} />
                </Col>
            ))}
            <Col
                span={24}
                style={{ display: 'flex', justifyContent: 'center' }}
            >
                <SubmitButton container={C} />
                <Button
                    onClick={(e) => {
                        message.info('skip this for you');
                        location.href = '/';
                    }}
                >
                    skip
                </Button>
            </Col>
        </Row>
    );
};

export default Tags;
