import { FC } from 'react';
import { Col, Row, Spin } from 'antd';
import NavBar from '../component/NavBar';
import React, { lazy, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import ChooseTags from './ChooseTags';

const QA = lazy(() => import('./Main/QA'));
const Video = lazy(() => import('./Main/Video'));
const Article = lazy(() => import('./Main/Article'));
const Index = lazy(() => import('./Main/IndexPage'));
const Activities = lazy(() => import('./Main/Activity'));

const User = lazy(() => import('./each/user'));

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
    return (
        <>
            <NavBar />
            <Row style={{ marginTop: 60 }}>
                <Col span={24}>
                    <Switch>
                        <Route exact path={['/', '/index']}>
                            <Render Lazy={Index} />
                        </Route>
                        <Route path="/articles">
                            <Render Lazy={Article} />
                        </Route>
                        <Route path="/QAs">
                            <Render Lazy={QA} />
                        </Route>
                        <Route path="/videos">
                            <Render Lazy={Video} />
                        </Route>
                        <Route path="/activities">
                            <Render Lazy={Activities} />
                        </Route>
                        <Route path="/articles/:id"></Route>
                        <Route path="/user/:id">
                            <Render Lazy={User} />
                        </Route>
                        <Route path="/login">
                            <Login />
                        </Route>
                        <Route path="/register">
                            <Register />
                        </Route>
                        <Route path="/chooseTags">
                            <ChooseTags />
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
