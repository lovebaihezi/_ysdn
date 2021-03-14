import { Header } from 'antd/lib/layout/layout';
import { Route, Switch } from 'react-router-dom';
import { objectId, user } from '../interface';
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
    </Route>
);
export default Routes;

export const Index = (
    // <Switch>
    <Route exact path="/">
        <IndexPage />
    </Route>
    // </Switch>
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
    <Route key="/login" exact path="/login">
        <LoginPage setAuth={setAuth} />
    </Route>
);

export const Register = ({
    setAuth,
}: {
    setAuth: (X: user & objectId) => void;
}) => (
    <Route key="/register" exact path="/register">
        <RegisterPage setAuth={setAuth} />
    </Route>
);

type returnRouteArray = ({
    setAuth,
}: {
    setAuth: (X: user & objectId) => void;
}) => Array<JSX.Element>;

// const combineRoute : (X : Array<JSX.Element> | (() => JSX.Element>)) => <P>(...args : P) => Array<JSX.Element> = () => () => [];

export const UserServer: returnRouteArray = ({ setAuth }) => [
    Login({ setAuth }),
    Register({ setAuth }),
];
