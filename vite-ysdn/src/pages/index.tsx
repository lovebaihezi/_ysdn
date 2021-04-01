import { Col, Row, Spin } from 'antd';
import React, { lazy, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import NavBar from '../component/NavBar';

const Index = lazy(() => import('./IndexPage'));

export default function Pages() {
    return (
        <Row>
            <Col span={22} offset={1}>
                <NavBar />
            </Col>
            <Col span={24}>
                <Switch>
                    <Route exact path={['/', '/index']}>
                        <Row justify="center">
                            <Suspense
                                fallback={
                                    <Col>
                                        <Spin size="large" />
                                    </Col>
                                }
                            >
                                <Col span={24}>
                                    <Index />
                                </Col>
                            </Suspense>
                        </Row>
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
    );
}
