import { FC, lazy, Suspense, useEffect } from 'react';
import React from 'react';
import { Row, Col, Image, Skeleton, Spin, Result } from 'antd';
import { AjaxJson } from '../../interface';
import { Redirect, Route, Switch, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { useFetchJson } from '../../tools/hook/useFetch';

const UserInformation = lazy(() => import('./Info'));

export default function User() {
    const { username } = useParams<{ username: string }>();
    const [[user, l, e], f, c] = useFetchJson<AjaxJson.userPageInfo>({
        url: '/user/' + username,
        option: { method: 'POST' },
    });
    useEffect(() => {
        f().catch(c);
    }, []);
    return (
        <Row>
            <Col span={24}>
                {l ? (
                    <Row>
                        <Col offset={12}>
                            <Spin size="large" />
                        </Col>
                    </Row>
                ) : e ? (
                    <Result title={e.name} subTitle={e.message} />
                ) : (
                    user && (
                        <Suspense fallback={<Skeleton />}>
                            <UserInformation user={user} />
                        </Suspense>
                    )
                )}
            </Col>
        </Row>
    );
}
