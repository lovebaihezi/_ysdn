import { Header } from 'antd/lib/layout/layout';
import React, { FC } from 'react';
import { Route } from 'react-router-dom';
import { objectId, user } from '../interface';
import AppBar from './AppBar';
import NotFoundPage from './forbidden/404';
import IndexPage from './index-page';
import LoginPage from './login';
const Routes: Array<JSX.Element> = [
    <Route exact path="/">
        <IndexPage />
    </Route>,
];
Routes.push(
    <Route exact to="/*">
        <NotFoundPage />
    </Route>
);
export default Routes;

export const Index = (
    <Route exact path="/">
        <IndexPage />
    </Route>
);

export const NotFound = (
    <Route exact to="/*">
        <NotFoundPage />
    </Route>
);

export const Bar = (
    <Header style={{ background: 'white' }}>
        <AppBar />
    </Header>
);

export const Login = ({
    setAuth,
}: {
    setAuth: (X: user & objectId) => void;
}) => (
    <Route exact path="/login">
        <LoginPage setAuth={setAuth} />
    </Route>
);
