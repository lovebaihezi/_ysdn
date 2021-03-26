import { Header } from 'antd/lib/layout/layout';
import { Route, Switch } from 'react-router-dom';
import { JsxEmit } from 'typescript';
import { AjaxJson } from '../interface';
import AppBar from './AppBar';
import NotFoundPage from './forbidden/404';
import IndexPage from './index-page';
import LoginPage from './login';
import RegisterPage from './register';
const Routes: Array<JSX.Element> = [
    <Route exact path="/">
        <IndexPage />
    </Route>,
];
Routes.push(
    <Route exact to="/*">
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
    <Route exact to="/*">
        <NotFoundPage />
    </Route>
);

export const Bar = (
    <Header style={{ background: 'white' }}>
        <AppBar />
    </Header>
);

export const Login = ({ setAuth }: { setAuth: (X: AjaxJson.user) => void }) => (
    <Route key="/auth/login" exact path="/login">
        <LoginPage setAuth={setAuth} />
    </Route>
);

export const Register = ({
    setAuth,
}: {
    setAuth: (X: AjaxJson.user) => void;
}) => (
    <Route key="/auth/register" exact path="/register">
        <RegisterPage setAuth={setAuth} />
    </Route>
);

export const User = () => {};

type returnRouteArray = ({
    setAuth,
}: {
    setAuth: (X: AjaxJson.user) => void;
}) => Array<JSX.Element>;

// const combineRoute : (X : Array<JSX.Element> | (() => JSX.Element>)) => <P>(...args : P) => Array<JSX.Element> = () => () => [];

export const UserServer: (
    setAuth: (X: AjaxJson.user) => void,
) => JSX.Element[] = (setAuth) => [Login({ setAuth }), Register({ setAuth })];
