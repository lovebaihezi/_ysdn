import { FC, lazy, Suspense, useEffect } from 'react';
import React from 'react';
import { Row, Col, Image, Skeleton, Spin, Result } from 'antd';
import { AjaxJson } from '../../interface';
import { Redirect, Route, Switch, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { useAuth } from '../../auth';
import { useFetchJson } from '../../tools/hook/useFetch';

const UserInformation = lazy(() => import('./Info'));

export default function User() {
    const { username } = useParams<{ username: string }>();
    const [[user, l, e], f, c] = useFetchJson<AjaxJson.user>({
        url: '/user/' + username,
        option: { method: 'POST' },
    });
    useEffect(() => {
        f();
    }, []);
    const I = useAuth();
    if (I && I.Account && I.Account.auth === username) {
        return <Redirect to="/I" />;
    } else {
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
}
