import { Header } from 'antd/lib/layout/layout';
import { Route, Switch } from 'react-router-dom';
import { AjaxJson } from '../interface';
import AppBar from './AppBar';
import NotFoundPage from './forbidden/404';
import IndexPage from './index-page';
import LoginPage from './login';
import RegisterPage from './register';
import React from 'react';
const Routes: Array<JSX.Element> = [
    <Route exact path="/">
        <IndexPage />
    </Route>,
];
Routes.push(
    <Route exact path="/*">
        <NotFoundPage />
    </Route>,
);
export default Routes;

export const Index = (
    <Route exact path="/">
        <IndexPage />
    </Route>
);

export const NotFound = (
    <Route exact path="/*">
        <NotFoundPage />
    </Route>
);

export const Bar = (
    <Header style={{ background: 'white' }}>
        <AppBar />
    </Header>
);

export const Login = ({ setAuth }: { setAuth: (X: string) => void }) => (
    <Route key="/auth/login" exact path="/login">
        <LoginPage setAuth={setAuth} />
    </Route>
);

export const Register = ({ setAuth }: { setAuth: (X: string) => void }) => (
    <Route key="/auth/register" exact path="/register">
        <RegisterPage setAuth={setAuth} />
    </Route>
);

export const User = () => {};

type returnRouteArray = ({
    setAuth,
}: {
    setAuth: (X: string) => void;
}) => Array<JSX.Element>;

// const combineRoute : (X : Array<JSX.Element> | (() => JSX.Element>)) => <P>(...args : P) => Array<JSX.Element> = () => () => [];

export const UserServer: (setAuth: (X: string) => void) => JSX.Element[] = (
    setAuth,
) => [Login({ setAuth }), Register({ setAuth })];
