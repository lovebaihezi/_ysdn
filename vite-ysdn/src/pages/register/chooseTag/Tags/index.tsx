import { Button, Card, Col, message, Row } from 'antd';
import React, { FC, useEffect, useRef, useState } from 'react';
import { Component } from '../../../../component/AjaxResponse';

import { HeartFilled, SendOutlined, HeartOutlined } from '@ant-design/icons';
import { useFetchJson } from '../../../../tools/hook/useFetch';
import { baseurl, useUserDetail } from '../../../../auth';
import { Redirect, useHistory, useRouteMatch } from 'react-router';
import { AjaxJson } from '../../../../interface';

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
            actions={[state ? <HeartFilled /> : <HeartOutlined />]}
        >
            {name}
        </Card>
    );
};

const SubmitButton: FC<{ container: Set<string> }> = ({ container }) => {
    const [D, R] = useUserDetail();
    const H = useHistory();
    const { url, path } = useRouteMatch();
    if (!D) {
        return <Redirect to="/register" />
    }
    const [[r, l, e], f, c] = useFetchJson<AjaxJson.userDetail>({
        url: baseurl + `/user/update/${D.username}/tags`,
        option: {
            method: 'post',
            headers: new Headers({ 'Content-Type': 'application/json' }),
            body: JSON.stringify([...container.values()]),
        },
    });
    useEffect(() => {
        if (l) {
            message.loading('loading');
        } else if (e || (r && r._id == undefined)) {
            message.error('error!, skip...');
            H.push(`/register/completeInformation`);
        } else if (r) {
            R(r);
            H.push(`/register/completeInformation`);
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
                style={{
                    display: 'flex',
                    justifyContent: 'space-around',
                }}
            >
                <SubmitButton container={C} />
            </Col>
        </Row>
    );
};

export default Tags;
