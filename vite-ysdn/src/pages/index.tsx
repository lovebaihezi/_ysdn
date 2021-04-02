import { Col, Row, Spin } from 'antd';
import React, { lazy, Suspense } from 'react';
import { FC } from 'react';
import { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import NavBar from '../component/NavBar';

const Index = lazy(() => import('./IndexPage'));
const Article = lazy(() => import('./Article'));

import './pages.css';

const Render: FC<{ Lazy: React.LazyExoticComponent<() => JSX.Element> }> = ({
    Lazy,
}) => (
    <Row justify="center">
        <Suspense
            fallback={
                <Col>
                    <Spin size="large" />
                </Col>
            }
        >
            <Col span={24}>
                <Lazy />
            </Col>
        </Suspense>
    </Row>
);

export default function Pages() {
    useEffect(() => {
        console.log('i am render!');
    });
    return (
        <>
            <NavBar />
            <Row style={{ marginTop: 80 }}>
                <Col span={24}>
                    <Switch>
                        <Route exact path={['/', '/index']}>
                            <Render Lazy={Index} />
                        </Route>
                        <Route path="/articles">
                            <Render Lazy={Article} />
                        </Route>
                        <Route path="*">
                            <Row justify="center">
                                <Col className="P404" span={24}>
                                    404
                                </Col>
                            </Row>
                        </Route>
                    </Switch>
                </Col>
            </Row>
        </>
    );
}
