import React from 'react';

import {
    Switch,
    BrowserRouter,
    Route,
    Link,
    HashRouter,
} from 'react-router-dom';

import Index, * as Pages from './pages/index';

import './App.css';
import { Button, Container, CssBaseline, IconButton } from '@material-ui/core';
import ButtonAppBar from './components/menu';
import { user } from './interface';
import AddIcon from '@material-ui/icons/Add';
import { LoginState } from './auth';

const alreadyLogin = [
    <IconButton
        edge="start"
        color="inherit"
        key="user-link"
        aria-label="user"></IconButton>,
    <Button
        color="inherit"
        component={Link}
        to="/upload"
        key="upload-button"
        startIcon={<AddIcon />}>
        upload
    </Button>,
];

function App() {
    const [loginStatus, setLoginStatus] = React.useState<false | user>(false);
    const [menuRender, setMenuRender] = React.useState<Array<JSX.Element>>([
        <Button color="inherit" key="login-button" component={Link} to="/login">
            Login
        </Button>,
    ]);
    function setState(res: user) {
        setLoginStatus(res);
    }
    React.useEffect(() => {
        // console.log(loginStatus);
        if (loginStatus && loginStatus?.Account?.username) {
            setMenuRender(alreadyLogin);
        } else {
            setLoginStatus(false);
        }
        return () => {};
    }, [loginStatus]);
    return (
        <>
            <CssBaseline />
            <LoginState.Provider value={loginStatus}>
                <BrowserRouter basename="/" forceRefresh={false}>
                    <ButtonAppBar Render={menuRender} />
                    <Container maxWidth="md" className="container">
                        <Switch>
                            <Route exact path="/">
                                <Index State={loginStatus} />
                            </Route>
                            <Route exact path="/login">
                                <Pages.Login setState={setState} />
                            </Route>
                            <Route exact path="/register">
                                <Pages.Register State={loginStatus} />
                            </Route>
                            <Route exact path="/find-password">
                                <Pages.FDM />
                            </Route>
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
