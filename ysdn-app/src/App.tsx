import React from 'react';

import { Switch, BrowserRouter, Route } from 'react-router-dom';

import Index, * as Pages from './pages/index';

import './App.css';

function App() {
    return (
        <BrowserRouter basename="/">
            <Switch>
                <Route exact path="/">
                    <Index />
                </Route>
                <Route exact path="/login">
                    <Pages.Login />
                </Route>
                <Route path="/*">
                    <Pages.Page404 />
                </Route>
            </Switch>
        </BrowserRouter>
    );
}

export default App;
