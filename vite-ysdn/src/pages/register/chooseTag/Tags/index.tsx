import { Button, Card, Col, message, Row } from 'antd';
import React, { FC, useEffect, useRef, useState } from 'react';
import { Component } from '../../../../component/AjaxResponse';

import { HeartFilled, SendOutlined, HeartOutlined } from '@ant-design/icons';
import { useFetchJson } from '../../../../tools/hook/useFetch';
import { baseurl, useUserDetail } from '../../../../auth';
import { Redirect, useHistory, useRouteMatch } from 'react-router';
import { AjaxJson } from '../../../../interface';

interface T {
    [x: string]: string;
}

const TAG: T = {
    'front-end': '前端',
    'client-side': '客户端',
    'server-side': '服务端',
    QA: '问答',
    media: '媒体',
    algorithm: '算法',
    data: '数据',
    common: '通识',
    product: '产品',
    security: '安全',
    project: '工程',
};

const Tag: FC<{ name: string; src?: string; onClick: () => boolean }> = ({
    name,
    src,
    onClick,
}) => {
    const [state, setState] = useState<boolean>(false);
    return (
        <Card
            hoverable={true}
            cover={
                <div style={{ justifyContent: 'center', display: 'flex' }}>
                    <img height="100px" src={src} />
                </div>
            }
            onClick={() => {
                const result = onClick();
                setState(!state && result);
            }}
            actions={[state ? <HeartFilled /> : <HeartOutlined />]}
        >
            {TAG[name]}
        </Card>
    );
};

const SubmitButton: FC<{ container: Set<string>; disabled: boolean }> = ({
    container,
    disabled,
}) => {
    const [D, R] = useUserDetail();
    const H = useHistory();
    const { url, path } = useRouteMatch();
    if (!D) {
        return <Redirect to="/register" />;
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
            disabled={disabled}
            onClick={async () => {
                await f().catch(c);
            }}
            size="large"
            type="primary"
            icon={<SendOutlined />}
        >
            确定
        </Button>
    );
};

const Tags: Component<string[]> = ({ Response }) => {
    const C = useRef(new Set<string>());
    const [disabled, setDisabled] = useState(0);
    useEffect(() => {
        console.log(C.current, disabled);
    });
    return (
        <Row>
            {Response.map((tag, i) => (
                <Col span={4} style={{ padding: 40 }} key={tag}>
                    <Tag
                        src={`http://127.0.0.1:8080/picture/t${i + 1}.png`}
                        onClick={() => {
                            if (C.current.size <= 3) {
                                if (C.current.has(tag)) {
                                    C.current.delete(tag);
                                    setDisabled((v) => v - 1);
                                } else {
                                    setDisabled((v) => v + 1);
                                    C.current.add(tag);
                                }
                                return true;
                            } else {
                                message.info('you can only choose three!');
                                return false;
                            }
                        }}
                        name={tag}
                    />
                </Col>
            ))}
            <Col
                span={24}
                style={{
                    display: 'flex',
                    justifyContent: 'space-around',
                }}
            >
                <SubmitButton disabled={disabled !== 3} container={C.current} />
            </Col>
        </Row>
    );
};

export default Tags;
