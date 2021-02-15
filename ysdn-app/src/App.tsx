import React from 'react';

import { Switch, BrowserRouter, Route } from 'react-router-dom';

import Index, * as Pages from './pages/index';

import './App.css';
import { Container, CssBaseline } from '@material-ui/core';
import ButtonAppBar from './components/menu';

function App() {
    return (
        <>
            <CssBaseline />
            <BrowserRouter basename="/">
                <ButtonAppBar />
                <Container maxWidth="md" className="container">
                    <Switch>
                        <Route exact path="/">
                            <Index />
                        </Route>
                        <Route exact path="/login">
                            <Pages.Login />
                        </Route>
                        <Route exact path="/register">
                            <Pages.Register />
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
        </>
    );
}

export default App;
