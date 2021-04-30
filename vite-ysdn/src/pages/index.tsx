import Login from './login';
import Register from './register';
import { FC, useEffect } from 'react';
import { Col, Row, Spin } from 'antd';
import NavBar from '../component/NavBar';
import React, { lazy, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import { useUserDetail } from '../auth';

const QA = lazy(() => import('./Main/QA'));
const User = lazy(() => import('./each/user'));
const QAPage = lazy(() => import('./each/QA'));
const Video = lazy(() => import('./Main/Video'));
const Article = lazy(() => import('./Main/Article'));
const Index = lazy(() => import('./Main/IndexPage'));
const Activities = lazy(() => import('./Main/Activity'));
const ArticlePage = lazy(() => import('./each/article'));
const UpdatePAge = lazy(() => import('./each/update'));
const ActivityPage = lazy(() => import('./each/activity'));

const LazySpinStyle = {
    display: 'flex',
    height: '100%',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
};

const Render: FC<{ Lazy: React.LazyExoticComponent<() => JSX.Element> }> = ({
    Lazy,
}) => (
    <Row justify="center">
        <Suspense
            fallback={
                <Col span={24} style={LazySpinStyle}>
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

// todo : your logic!!!, write it down!

export default function Pages() {
    const [userDetail] = useUserDetail();
    useEffect(() => {
        console.log(userDetail);
    });
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
                        <Route path="/article/:id">
                            <Render Lazy={ArticlePage} />
                        </Route>
                        <Route path="/QA/:id">
                            <Render Lazy={QAPage} />
                        </Route>
                        <Route path="/user/:id">
                            <Render Lazy={User} />
                        </Route>
                        <Route path="/update/:name">
                            <Render Lazy={UpdatePAge} />
                        </Route>
                        <Route path="/activities/:id">
                            <Render Lazy={ActivityPage} />
                        </Route>
                        <Route path="/login">
                            <Login />
                        </Route>
                        <Route path="/register">
                            <Register />
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
