import React from 'react';

import { Switch, BrowserRouter, Route, Link } from 'react-router-dom';

import Index, * as Pages from './pages/index';

import './App.css';
import { Button, Container, CssBaseline, IconButton } from '@material-ui/core';
import ButtonAppBar from './components/menu';
import { user } from './interface';
import AddIcon from '@material-ui/icons/Add';
import { LoginState } from './auth';
import BlogManage from './pages/blog';
import { Schema } from 'mongoose';

const alreadyLogin = [
    <IconButton
        edge="start"
        color="inherit"
        key="user-link"
        aria-label="user">{}</IconButton>,
    <Button
        color="inherit"
        component={Link}
        to="/blogManage/upload-article"
        key="upload-button"
        startIcon={<AddIcon />}>
        upload
    </Button>,
];

const initial = (
    <Button color="inherit" key="login-button" component={Link} to="/login">
        Login
    </Button>
);

function App() {
    const [userInformation, setUserInformation] = React.useState<
        false | (user & { _id: Schema.Types.ObjectId })
    >(false);
    const [menuRender, setMenuRender] = React.useState<Array<JSX.Element>>([
        initial,
    ]);
    function setState(res: user & { _id: Schema.Types.ObjectId }) {
        setUserInformation(res);
    }
    React.useEffect(() => {
        if (userInformation) {
            sessionStorage.setItem('user', JSON.stringify(userInformation));
            setMenuRender(alreadyLogin);
        }
    }, [userInformation]);
    React.useEffect(() => {
        const user = sessionStorage.getItem('user');
        if (user) {
            setUserInformation(JSON.parse(user));
            setMenuRender(alreadyLogin);
        }
    }, []);
    return (
        <>
            <CssBaseline />
            <LoginState.Provider value={userInformation}>
                <BrowserRouter basename="/">
                    <ButtonAppBar Render={menuRender} />
                    <Container maxWidth="md" className="container">
                        <Switch>
                            <Route exact path="/">
                                <Index />
                            </Route>
                            <Route exact path="/login">
                                <Pages.Login setState={setState} />
                            </Route>
                            <Route exact path="/register">
                                <Pages.Register setState={setState} />
                            </Route>
                            <Route exact path="/find-password">
                                <Pages.FDM />
                            </Route>
                            <Route exact path="/blogManage/*">
                                <BlogManage />
                            </Route>
                            <Route exact path="/user"></Route>
                            <Route path="/*">
                                <Pages.Page404 />
                            </Route>
                        </Switch>
                    </Container>
                </BrowserRouter>
            </LoginState.Provider>
        </>
    );
}

export default App;
